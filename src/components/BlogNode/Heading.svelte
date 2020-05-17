<script>
  import Text from "./Text.svelte"

  export let node
</script>

{#if node.depth === 1}
  <h1>
    {#each node.children as child}
      <Text node="{child}" />
    {/each}
  </h1>
{:else if node.depth === 2}
  <h2>
    {#each node.children as child}
      <Text node="{child}" />
    {/each}
  </h2>
{:else if node.depth === 3}
  <h3>
    {#each node.children as child}
      <Text node="{child}" />
    {/each}
  </h3>
{:else if node.depth === 4}
  <h4>
    {#each node.children as child}
      <Text node="{child}" />
    {/each}
  </h4>
{:else if node.depth === 5}
  <h5>
    {#each node.children as child}
      <Text node="{child}" />
    {/each}
  </h5>
{:else}
  <h6>
    {#each node.children as child}
      <Text node="{child}" />
    {/each}
  </h6>
{/if}
