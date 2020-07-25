<script context="module">
  import { get } from "../../utils/http"

  export async function preload({ params }) {
    try {
      // the `slug` parameter is available because
      // this file is called [slug].svelte
      const post = await get(this.fetch)(`/projects/${params.slug}.json`)

      return { post }
    } catch (e) {
      if (e.status === 404) {
        this.error(404, "Not found")
      } else {
        this.error(e.status, "Page unavailable")
      }
    }
  }
</script>

<script>
  import Node from "../../components/BlogNode/Node.svelte"
  import BlogKudos from "../../components/BlogKudos/BlogKudos.svelte"

  export let post
</script>

<svelte:head>
  <title>{post.title} - Ellsworthy 🍕</title>
</svelte:head>

<h1>{post.title}</h1>

<div>
  {#each post.content as node}
    <Node {node} />
  {/each}
</div>

<BlogKudos slug="{post.slug}" />
