<script>
  import { onMount } from "svelte"
  import { initTwitter, displayTweet } from "./utils"

  export let node

  let container

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
