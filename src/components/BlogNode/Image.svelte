<script>
  export let node
</script>

<style>
  img {
    display: block;
    margin: 12px 0;
  }
</style>

<img style="max-width: {node.width}px" src="{node.url}" alt="{node.alt}" />
