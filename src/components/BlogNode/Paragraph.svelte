<script>
  import Text from "./Text.svelte"

  export let node
</script>

<style>
  p {
    margin: 24px 0;
  }
</style>

<p>
  {#each node.children as child}
    <Text node="{child}" />
  {/each}
</p>
