<script>
  import InlineNodes from "./InlineNodes.svelte"

  export let node
</script>

{#if node.depth === 1}
  <h1>
    <InlineNodes nodes="{node.children}" />
  </h1>
{:else if node.depth === 2}
  <h2>
    <InlineNodes nodes="{node.children}" />
  </h2>
{:else if node.depth === 3}
  <h3>
    <InlineNodes nodes="{node.children}" />
  </h3>
{:else if node.depth === 4}
  <h4>
    <InlineNodes nodes="{node.children}" />
  </h4>
{:else if node.depth === 5}
  <h5>
    <InlineNodes nodes="{node.children}" />
  </h5>
{:else}
  <h6>
    <InlineNodes nodes="{node.children}" />
  </h6>
{/if}
