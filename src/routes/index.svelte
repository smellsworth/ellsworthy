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
  import { URL, IMAGE_URL, TITLE, DESCRIPTION } from "../utils/metatags"

  export let essays
  export let projects
</script>

<svelte:head>
  <title>{TITLE}</title>
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

<About />

<BlogIndex title="Essays" urlPrefix="blog" posts="{essays}" />
<BlogIndex title="Projects" urlPrefix="projects" posts="{projects}" />
