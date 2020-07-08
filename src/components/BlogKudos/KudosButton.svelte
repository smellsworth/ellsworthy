<script>
  import { fade, fly } from "svelte/transition"

  export let sent
</script>

<style lang="scss">
  .container {
    position: relative;
    margin-left: 16px;
    margin-top: 36px;
    flex: 1;
  }

  button {
    position: relative;
    z-index: 2;
    height: 30px;
    width: 180px;
    border: 1px solid;
    border-radius: 3px;
    background: var(--background);
    color: inherit;
    outline: none;
    font: inherit;
    cursor: pointer;
    transition: 200ms;

    &:focus {
      color: var(--cta_background);
    }
  }

  .thanks-message {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    z-index: 2;
    height: 30px;
    line-height: 30px;
    background: var(--background);
  }

  img {
    position: absolute;
    z-index: 1;
    top: -5px;
    bottom: 0;
    left: 70px;
    width: 40px;
    height: 40px;
    transition: 600ms;
    transform: rotate(0) translateY(0) rotate(180deg) scale(0.75);
  }

  .dot {
    position: absolute;
    z-index: 1;
    top: 0;
    bottom: 0;
    left: 85px;
    border-radius: 50%;
    background-color: #b9361e;
    transition: 600ms;
  }
  .dot1 {
    width: 13px;
    height: 13px;
  }
  .dot2 {
    width: 9px;
    height: 9px;
  }
  .dot3 {
    width: 11px;
    height: 11px;
  }

  .sent {
    img {
      transform: rotate(-89deg) translateY(-136px) rotate(89deg) scale(1);
    }

    .dot {
      opacity: 0;
    }
    .dot1 {
      transform: rotate(-90deg) translateY(-80px);
    }
    .dot2 {
      transform: rotate(90deg) translateY(-70px);
    }
    .dot3 {
      transform: rotate(90deg) translateY(-50px);
    }
  }
</style>

<div class="container" class:sent>
  {#if !sent}
    <button on:click out:fade="{{ duration: 100 }}">Push a pizza slice</button>
  {:else}
    <div class="thanks-message" in:fly="{{ y: 30, opacity: 0 }}">
      Thanks for your slice!
    </div>
  {/if}
  <img src="pizza-slice.png" alt="Pizza slice" />
  <span class="dot dot1"></span>
  <span class="dot dot2"></span>
  <span class="dot dot3"></span>
</div>
