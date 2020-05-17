<script>
  export let node
</script>

<style>
  .image {
    display: block;
    margin: 24px 0;
  }
</style>

<img
  class="image"
  style="max-width: {node.width}px"
  src="{node.url}"
  alt="{node.alt}"
/>
