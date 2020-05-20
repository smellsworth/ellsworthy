<script>
  import Text from "./Text.svelte"

  export let node
</script>

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
