<script>
  export let nodes
</script>

{#each nodes as node}
  <span>{node.value}</span>
{/each}
