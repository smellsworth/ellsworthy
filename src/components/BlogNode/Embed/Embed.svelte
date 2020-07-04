<script>
  import { onMount } from "svelte"
  import { extractScript, insertScript } from "./utils"

  export let node

  const { html, scriptSrc } = extractScript(node.html)

  onMount(() => {
    insertScript(scriptSrc)
  })
</script>

<style>
  .container {
    margin: 24px 0;
  }
</style>

<div class="container">
  {@html html}
</div>
