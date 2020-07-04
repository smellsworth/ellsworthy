<script>
  import Nav from "../components/Nav.svelte"

  export let segment
</script>

<style lang="scss">
  @import "app-colors";
  @import "responsive";

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

    min-width: 320px;
    margin: 0;
    background-color: var(--background);
    color: var(--text);
    font-family: "Roboto Mono", monospace;
    font-size: 14px;

    @include phone {
      font-size: 12px;
    }
  }

  main {
    max-width: 700px;
    padding: 0 12px;
    margin: auto;

    @include phone {
      padding: 0 8px;
    }
  }
</style>

<Nav {segment} />

<main>
  <slot />
</main>
