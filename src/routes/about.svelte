<script>
  import isEmail from "validator/lib/isEmail"

  let email = ""
  let subscriptionStatus = "NOT_SEND"
  $: loading = subscriptionStatus === "LOADING"
  $: valid = isEmail(email)

  async function subscribeNewsLetter() {
    try {
      subscriptionStatus = "LOADING"
      const response = await fetch(`/email.json?email=${email}`, {
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

<svelte:head>
  <title>About</title>
</svelte:head>

<h1>About this site</h1>

<p>This is the 'about' page. There's not much here.</p>

<form on:submit|preventDefault="{subscribeNewsLetter}">
  <label for="email_input">Subscribe to news letter</label>
  <input type="email" bind:value="{email}" />
  <button type="submit" disabled="{!valid}">
    {#if loading}Sending{:else}Submit{/if}
  </button>
</form>
