<script>
  import Text from "./Text.svelte"

  export let nodes
</script>

{#each nodes as node}
  <Text {node} />
{/each}
