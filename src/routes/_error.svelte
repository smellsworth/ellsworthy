<script>
  import { URL, IMAGE_URL, TITLE, DESCRIPTION } from "../utils/metatags"

  export let status
  export let error
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
  <title>{error.message} - {TITLE}</title>
  <meta name="title" content="{TITLE}" />
  <meta name="description" content="{DESCRIPTION}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="blog" />
  <meta property="og:url" content="{URL}" />
  <meta property="og:title" content="{TITLE}" />
  <meta property="og:description" content="{DESCRIPTION}" />
  <meta property="og:image" content="{IMAGE_URL}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{URL}" />
  <meta property="twitter:title" content="{TITLE}" />
  <meta property="twitter:description" content="{DESCRIPTION}" />
  <meta property="twitter:image" content="{IMAGE_URL}" />
</svelte:head>

<div>
  <h1>
    {status}
    <span>{error.message}</span>
  </h1>
</div>
