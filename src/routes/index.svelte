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
</script>

<svelte:head>
  <title>Ellsworthy 🍕</title>
</svelte:head>

<About />

<BlogIndex title="Essays" urlPrefix="blog" posts="{essays}" />
<BlogIndex title="Projects" urlPrefix="projects" posts="{projects}" />
