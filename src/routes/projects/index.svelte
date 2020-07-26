<script context="module">
  import { get } from "../../utils/http"

  export async function preload() {
    try {
      const posts = await get(this.fetch)("/projects.json")

      return { posts }
    } catch (e) {
      this.error(500, "Page unavailable")
    }
  }
</script>

<script>
  import BlogIndex from "../../components/BlogIndex/BlogIndex.svelte"

  export let posts
</script>

<svelte:head>
  <title>Projects - Ellsworthy 🍕</title>
  <meta
    name="description"
    content="Trying to figure out where/what to eat. COO @PandaScore. Food,
    Esports, Business. Ex-Partner @500startups. Bad opinions are probably mine.
    食い倒れ He/him."
  />
</svelte:head>

<BlogIndex title="Projects" urlPrefix="projects" {posts} />
