<script>
  import InlineNodes from "./InlineNodes.svelte"

  export let node
</script>

<p>
  <InlineNodes nodes="{node.children}" />
</p>
