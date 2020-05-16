<script>
  export let node
</script>

{#if node.ordered}
  <ol>
    {#each node.items as item}
      <li>{item.value}</li>
    {/each}
  </ol>
{:else}
  <ul>
    {#each node.items as item}
      <li>{item.value}</li>
    {/each}
  </ul>
{/if}
