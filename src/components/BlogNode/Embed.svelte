<script>
  export let node
</script>

<style>
  .container {
    margin: 24px 0;
    padding: 4px 8px;
    border: 1px solid #888;
  }
</style>

<div class="container">
  <div>{node.provider}</div>
  <div>{node.title}</div>
  <a href="{node.url}" target="_blank" rel="noopener">{node.url}</a>
</div>
