<script>
  export let sent
</script>

<style lang="scss">
  .container {
    position: relative;
    margin-left: 16px;
    margin-top: 36px;
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

  img {
    position: absolute;
    z-index: 1;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0px;
    width: 40px;
    height: 40px;
    margin: auto;
    transition: 800ms;
    transform: rotate(0) translateY(0) rotate(0) scale(0.8);
  }

  .img_pushed {
    transform: rotate(-89deg) translateY(-136px) rotate(89deg) scale(1);
  }
</style>

<div class="container">
  <button on:click>Push a pizza slice</button>
  <img class:img_pushed="{sent}" src="pizza-slice.png" alt="Pizza slice" />
</div>
