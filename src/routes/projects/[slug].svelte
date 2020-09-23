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
  import { PROJECTS_URL, IMAGE_URL, TITLE } from "../../utils/metatags"

  export let post

  const pageTitle = `${post.title} - ${TITLE}`
  const pageUrl = `${PROJECTS_URL}/${post.slug}`
  const socialMediaImageUrl = post.socialMediaImageUrl ?? IMAGE_URL
</script>

<svelte:head>
  <title>{pageTitle}</title>
  <meta name="description" content="{post.description}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="blog" />
  <meta property="og:url" content="{pageUrl}" />
  <meta property="og:title" content="{pageTitle}" />
  <meta property="og:description" content="{post.description}" />
  <meta property="og:image" content="{socialMediaImageUrl}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{pageUrl}" />
  <meta property="twitter:title" content="{pageTitle}" />
  <meta property="twitter:description" content="{post.description}" />
  <meta property="twitter:image" content="{socialMediaImageUrl}" />
</svelte:head>

<h1>{post.title}</h1>

<div>
  {#each post.content as node}
    <Node {node} />
  {/each}
</div>

<BlogKudos type="project" slug="{post.slug}" />
