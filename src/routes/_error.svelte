<script>
  export let status
  export let error

  const dev = process.env.NODE_ENV === "development"
</script>

<style>
  div {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  span {
    font-size: 18px;
  }
</style>

<svelte:head>
  <title>{error.message} - Ellsworthy 🍕</title>
</svelte:head>

<div>
  <h1>
    {status}
    <span>{error.message}</span>
  </h1>
</div>
