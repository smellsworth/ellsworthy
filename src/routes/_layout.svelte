<script>
  import Nav from "../components/Nav.svelte"

  export let segment
</script>

<style lang="scss">
  @import "app-colors";

  :global(body) {
    @include lightTheme;
    @media (prefers-color-scheme: dark) {
      @include darkTheme;
    }

    background-color: var(--background);
    color: var(--text);
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
