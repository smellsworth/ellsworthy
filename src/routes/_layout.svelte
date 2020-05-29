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

      :global(img) {
        opacity: 0.75;
        transition: opacity 500ms;
        &:hover {
          opacity: 1;
        }
      }
    }

    margin: 0;
    background-color: var(--background);
    color: var(--text);
    font-family: "Roboto Mono", monospace;
    font-size: 14px;
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
