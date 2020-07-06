<script>
  import Nav from "../components/Nav.svelte"
  import SubscriptionForm from "../components/SubscriptionForm.svelte"

  export let segment
</script>

<style lang="scss">
  @import "app-colors";
  @import "responsive";

  :global(html) {
    height: 100%;
  }
  :global(#sapper) {
    height: 100%;
  }

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

    height: 100%;
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

  .page {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-width: 700px;
    padding: 0 12px;
    margin: auto;

    @include phone {
      padding: 0 8px;
    }
  }

  main {
    flex: 1;
  }
</style>

<div class="page">
  <Nav {segment} />

  <main>
    <slot />
  </main>

  <SubscriptionForm />
</div>
