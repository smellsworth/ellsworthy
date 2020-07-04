<script context="module">
  import { get } from "../../utils/http"

  export async function preload() {
    try {
      const posts = await get(this.fetch)("/blog.json")

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
  <title>Essays</title>
</svelte:head>

<BlogIndex title="Essays" urlPrefix="blog" {posts} />
