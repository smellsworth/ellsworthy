<script>
  import { onMount } from "svelte"
  import { setTheme, extractScript, insertScript } from "./utils"

  export let node

  const { html, scriptSrc } = extractScript(node.html)

  onMount(() => {
    setTheme()
    insertScript(scriptSrc)
  })
</script>

<style>
  .container {
    margin: 24px 0;
    display: flex;
    justify-content: center;
  }
</style>

<div class="container">
  {@html html}
</div>
