<script>
  import Text from "./Text.svelte"

  export let node
</script>

<style>
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin-top: 32px;
    padding-bottom: 8px;
    border-bottom: 1px solid var(--border_color);
    text-transform: uppercase;
  }

  h1 {
    margin-bottom: 12px;
    font-size: 20px;
  }

  h2 {
    margin-bottom: 12px;
    font-size: 17px;
  }

  h3 {
    margin-bottom: 8px;
    font-size: 15px;
  }

  h4 {
    margin-bottom: 8px;
    font-size: 13px;
  }

  h5 {
    margin-bottom: 8px;
    font-size: 13px;
  }

  h6 {
    margin-bottom: 8px;
    font-size: 13px;
  }
</style>

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
