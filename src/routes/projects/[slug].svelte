<script context="module">
  import Node from "../../components/BlogNode/Node.svelte"
  import BlogKudos from "../../components/BlogKudos/BlogKudos.svelte"
  import { loadArticle } from "./_utils"

  export async function preload({ params, query }) {
    try {
      // the `slug` parameter is available because
      // this file is called [slug].svelte
      const post = await loadArticle(this.fetch)(params.slug)

      return { post }
    } catch (e) {
      if (e.message === "Not found") {
        this.error(404, "Not found")
      } else {
        this.error(500, "Page unavailable")
      }
    }
  }
</script>

<script>
  export let post
</script>

<svelte:head>
  <title>{post.title}</title>
</svelte:head>

<h1>{post.title}</h1>

<div>
  {#each post.content as node}
    <Node {node} />
  {/each}
</div>

<BlogKudos slug="{post.slug}" />
