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
  <meta
    name="description"
    content="Trying to figure out where/what to eat. COO @PandaScore. Food,
    Esports, Business. Ex-Partner @500startups. Bad opinions are probably mine.
    食い倒れ He/him."
  />
</svelte:head>

<div>
  <h1>
    {status}
    <span>{error.message}</span>
  </h1>
</div>
