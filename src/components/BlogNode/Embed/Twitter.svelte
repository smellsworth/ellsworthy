<script>
  import { onMount } from "svelte"
  import { initTwitter, displayTweet } from "./utils"

  export let node

  let container

  /**
   * use custom integration because {@html embed_content} doesn't work with twitter
   * this custom integration make dark mode integration easier (without this integration we'll need to change meta tags in head)
   */
  onMount(() => {
    // we don't use `<script context="module">` because loading twitter script makea glitch on screen
    // so when we prefetch the script from index page, it make the page blink
    // by loading with onMount we still have this blink but as it's during page rendering this is less anoying
    initTwitter()
    const timeout = displayTweet(container, node)

    return () => {
      clearTimeout(timeout)
    }
  })
</script>

<div bind:this="{container}"></div>
