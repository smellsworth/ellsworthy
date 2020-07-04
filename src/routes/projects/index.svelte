<script context="module">
  import { loadIndex } from "./_utils"

  export async function preload({ params, query }) {
    try {
      const posts = await loadIndex(this.fetch)()

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
  <title>Projects</title>
</svelte:head>

<BlogIndex title="Projects" urlPrefix="projects" {posts} />
