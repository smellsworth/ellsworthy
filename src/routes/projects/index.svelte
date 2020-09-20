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
  import {
    PROJECTS_URL,
    IMAGE_URL,
    PROJECTS_TITLE,
    DESCRIPTION,
  } from "../../utils/metatags"

  export let posts
</script>

<svelte:head>
  <title>{PROJECTS_TITLE}</title>
  <meta name="title" content="{PROJECTS_TITLE}" />
  <meta name="description" content="{DESCRIPTION}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="blog" />
  <meta property="og:url" content="{PROJECTS_URL}" />
  <meta property="og:title" content="{PROJECTS_TITLE}" />
  <meta property="og:description" content="{DESCRIPTION}" />
  <meta property="og:image" content="{IMAGE_URL}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{PROJECTS_URL}" />
  <meta property="twitter:title" content="{PROJECTS_TITLE}" />
  <meta property="twitter:description" content="{DESCRIPTION}" />
  <meta property="twitter:image" content="{IMAGE_URL}" />
</svelte:head>

<BlogIndex title="Projects" urlPrefix="projects" {posts} />
