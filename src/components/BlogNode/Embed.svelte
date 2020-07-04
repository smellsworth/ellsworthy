<script>
  import Twitter from "./Embed/Twitter.svelte"
  import YouTube from "./Embed/YouTube.svelte"

  export let node
</script>

<style>
  .container {
    margin: 24px 0;
  }

  .default {
    padding: 4px 8px;
    border: 1px solid #888;
  }
</style>

<div class="container">
  {#if node.provider === 'Twitter'}
    <Twitter {node} />
  {:else if node.provider === 'YouTube'}
    <YouTube {node} />
  {:else}
    <div class="default">
      <div>{node.provider}</div>
      <div>{node.title}</div>
      <a href="{node.url}" target="_blank" rel="noopener">{node.url}</a>
    </div>
  {/if}
</div>
