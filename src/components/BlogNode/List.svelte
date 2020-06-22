<script>
  import Text from "./Text.svelte"

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
        {#each item as child}
          <Text node="{child}" />
        {/each}
      </li>
    {/each}
  </ol>
{:else}
  <ul>
    {#each node.items as item}
      <li>
        {#each item as child}
          <Text node="{child}" />
        {/each}
      </li>
    {/each}
  </ul>
{/if}
