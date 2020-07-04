<script>
  import Twitter from "./Embed/Twitter.svelte"

  export let node
</script>

<style>
  .container {
    margin: 24px 0;
    padding: 4px 8px;
    border: 1px solid #888;
  }
</style>

{#if node.provider === 'Twitter'}
  <Twitter {node} />
{:else}
  <div class="container">
    <div>{node.provider}</div>
    <div>{node.title}</div>
    <a href="{node.url}" target="_blank" rel="noopener">{node.url}</a>
  </div>
{/if}
