<script>
  import Nav from "../components/Nav.svelte"

  export let segment
</script>

<style lang="scss">
  @import "app-colors";

  :global(body) {
    background-color: $background-light;
    color: $text-light;
  }

  main {
    position: relative;
    max-width: 56em;
    padding: 2em;
    margin: 0 auto;
    box-sizing: border-box;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
