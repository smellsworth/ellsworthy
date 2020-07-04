<script>
  import TextNodes from "./TextNodes.svelte"

  export let node
</script>

<style>
  ol,
  ul {
    margin: 12px 0;
  }
  p + ol {
    margin-top: -8px;
  }
  p + ul {
    margin-top: -8px;
  }

  li {
    margin: 4px 0;
  }
</style>

{#if node.ordered}
  <ol>
    {#each node.items as item}
      <li>
        <TextNodes nodes="{item}" />
      </li>
    {/each}
  </ol>
{:else}
  <ul>
    {#each node.items as item}
      <li>
        <TextNodes nodes="{item}" />
      </li>
    {/each}
  </ul>
{/if}
