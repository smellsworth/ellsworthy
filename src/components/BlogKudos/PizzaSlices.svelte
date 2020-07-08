<script>
  export let number

  $: nbDisplayed = Math.min(number, 3) // we don't display more than 3 slices stack
  $: list = Array.apply(null, Array(nbDisplayed)) // create an array for iteration in template
</script>

<style>
  .container {
    position: relative;
    width: 50px;
    height: 40px;
  }

  img {
    position: absolute;
    right: -3px;
    bottom: 0;
    width: 40px;
    height: 40px;
  }
  img:nth-child(2) {
    right: 1px;
    bottom: 1px;
  }
  img:nth-child(3) {
    right: 5px;
    bottom: 2px;
  }
</style>

<div class="container">
  {#each list as _}
    <img src="pizza-slice.png" alt="Pizza slice" />
  {/each}
</div>
