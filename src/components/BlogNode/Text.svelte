<script>
  export let node
</script>

{#if node.type === 'text'}
  <span>{node.value}</span>
{:else if node.type === 'strong'}
  <strong>
    {#each node.children as child}
      <svelte:self node="{child}" />
    {/each}
  </strong>
{:else if node.type === 'emphasis'}
  <em>
    {#each node.children as child}
      <svelte:self node="{child}" />
    {/each}
  </em>
{:else if node.type === 'link'}
  <a href="{node.url}" target="_blank" rel="noopener">
    {#each node.children as child}
      <svelte:self node="{child}" />
    {/each}
  </a>
{/if}
