<script>
  import TextNodes from "./TextNodes.svelte"

  export let node
</script>

<style>
  p {
    margin: 12px 0;
  }
</style>

<p>
  <TextNodes nodes="{node.children}" />
</p>
