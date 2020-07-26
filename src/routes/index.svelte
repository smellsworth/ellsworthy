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
  <meta
    name="description"
    content="Trying to figure out where/what to eat. COO @PandaScore. Food,
    Esports, Business. Ex-Partner @500startups. Bad opinions are probably mine.
    食い倒れ He/him."
  />
</svelte:head>

<About />

<BlogIndex title="Essays" urlPrefix="blog" posts="{essays}" />
<BlogIndex title="Projects" urlPrefix="projects" posts="{projects}" />
