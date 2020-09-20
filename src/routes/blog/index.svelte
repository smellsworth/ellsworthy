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
  import {
    BLOG_URL,
    IMAGE_URL,
    BLOG_TITLE,
    DESCRIPTION,
  } from "../../utils/metatags"

  export let posts
</script>

<svelte:head>
  <title>{BLOG_TITLE}</title>
  <meta name="title" content="{BLOG_TITLE}" />
  <meta name="description" content="{DESCRIPTION}" />

  <!-- Open Graph / Facebook -->
  <meta property="og:type" content="blog" />
  <meta property="og:url" content="{BLOG_URL}" />
  <meta property="og:title" content="{BLOG_TITLE}" />
  <meta property="og:description" content="{DESCRIPTION}" />
  <meta property="og:image" content="{IMAGE_URL}" />

  <!-- Twitter -->
  <meta property="twitter:card" content="summary_large_image" />
  <meta property="twitter:url" content="{BLOG_URL}" />
  <meta property="twitter:title" content="{BLOG_TITLE}" />
  <meta property="twitter:description" content="{DESCRIPTION}" />
  <meta property="twitter:image" content="{IMAGE_URL}" />
</svelte:head>

<BlogIndex title="Essays" urlPrefix="blog" {posts} />
