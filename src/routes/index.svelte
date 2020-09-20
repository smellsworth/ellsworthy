<script context="module">
  import { get } from "../utils/http"

  export async function preload({ params, query }) {
    try {
      const { essays, projects } = await get(this.fetch)("/index.json")

      return { essays, projects }
    } catch (e) {
      this.error(500, "Page unavailable")
    }
  }
</script>

<script>
  import About from "../components/About.svelte"
  import BlogIndex from "../components/BlogIndex/BlogIndex.svelte"

  export let essays
  export let projects

  const url = "https://matt-website.now.sh/"
  const imageUrl = `${url}og-image.png`
  const title = "Ellsworthy 🍕"
  const description =
    "Trying to figure out where/what to eat. COO @PandaScore. Food, Esports, Business. Ex-Partner @500startups. Bad opinions are probably mine. 食い倒れ He/him."
</script>

<svelte:head>
  <title>{title}</title>
  <meta name="title" content="{title}" />
  <meta name="description" content="{description}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="blog" />
  <meta property="og:url" content="{url}" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:image" content="{imageUrl}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{url}" />
  <meta property="twitter:title" content="{title}" />
  <meta property="twitter:description" content="{description}" />
  <meta property="twitter:image" content="{imageUrl}" />
</svelte:head>

<About />

<BlogIndex title="Essays" urlPrefix="blog" posts="{essays}" />
<BlogIndex title="Projects" urlPrefix="projects" posts="{projects}" />
