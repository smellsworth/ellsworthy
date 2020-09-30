<script>
  import isEmail from "validator/lib/isEmail"

  let email = ""
  let subscriptionStatus = "NOT_SEND"
  $: loading = subscriptionStatus === "LOADING"
  $: succeed = subscriptionStatus === "SUCCEED"
  $: failed = subscriptionStatus === "FAILED"
  $: valid = isEmail(email)

  async function subscribeNewsLetter() {
    try {
      subscriptionStatus = "LOADING"
      const response = await fetch(`api/email/post?email=${email}`, {
        method: "POST",
      })
      if (response.ok) {
        subscriptionStatus = "SUCCEED"
        email = ""
      } else {
        subscriptionStatus = "FAILED"
      }
    } catch (e) {
      console.error(e)
      subscriptionStatus = "FAILED"
    }
  }
</script>

<style lang="scss">
  @import "mixins";
  @import "responsive";

  .container {
    padding: 24px 0;
  }

  form {
    padding: 16px;
    border: 1px solid var(--border_color);

    @include phone {
      margin: 16px 0;
      padding: 12px;
    }
  }
  .sentence {
    margin: 0 0 12px 0;
  }
  .error {
    color: var(--error_color);
  }
  .success {
    color: var(--success_color);
  }
  .field {
    height: 30px;
    display: flex;
  }
  .input {
    flex: 1;
    max-width: 300px;
    height: 100%;
    padding: 0 8px;
    box-sizing: border-box;
    border: 1px solid var(--border_color);
    border-radius: 3px 0 0 3px;
    background: none;
    outline: none;
    font: inherit;
    color: inherit;
    transition: 200ms;

    &:focus {
      border-color: var(--cta_background);
    }
  }
  .button {
    height: 100%;
    width: 110px;
    padding: 0 16px;
    border: none;
    border-radius: 0 3px 3px 0;
    background: var(--cta_background);
    color: var(--cta_color);
    outline: none;
    font: inherit;
    cursor: pointer;
    transition: 200ms;

    &:disabled {
      background: var(--border_color);
      cursor: default;
    }

    &:focus {
      text-decoration: underline;
    }
  }
  .loader {
    position: relative;
    top: -1px;
    display: inline-block;
    width: 10px;
    height: 10px;
    vertical-align: middle;
    border: 2px solid var(--cta_color);
    border-right-color: transparent;
    border-radius: 50%;
    animation: rotate 1200ms linear infinite;
  }

  a {
    @include linkRules;
  }

  @keyframes rotate {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>

<div class="container">
  <form on:submit|preventDefault="{subscribeNewsLetter}">
    <p class="sentence">
      You can follow me
      <a
        href="https://twitter.com/mattellsworth"
        target="_blank"
        rel="noopener"
      >
        on Twitter
      </a>
      or subscribe to my newsletter:
    </p>
    {#if failed}
      <p class="sentence error">
        Look like we have a problem, please retry later.
      </p>
    {/if}
    {#if succeed}
      <p class="sentence success">Email sent with success!</p>
    {/if}
    <div class="field">
      <input
        class="input"
        type="email"
        bind:value="{email}"
        disabled="{loading}"
      />
      <button class="button" type="submit" disabled="{!valid}">
        {#if loading}
          <span class="loader"></span>
        {:else}Subscribe{/if}
      </button>
    </div>
  </form>
</div>
