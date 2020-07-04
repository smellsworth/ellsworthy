<script context="module">
  import { loadIndex } from "./_utils"

  export async function preload({ params, query }) {
    try {
      const { essays, projects } = await loadIndex(this.fetch)()

      return { essays, projects }
    } catch (e) {
      this.error(500, "Page unavailable")
    }
  }
</script>

<script>
  import About from "../components/About.svelte"
  import BlogIndex from "../components/BlogIndex/BlogIndex.svelte"
  import SubscriptionForm from "../components/SubscriptionForm.svelte"

  export let essays
  export let projects
</script>

<svelte:head>
  <title>Ellsworthy blog</title>
</svelte:head>

<About />

<BlogIndex title="Essays" urlPrefix="blog" posts="{essays}" />
<BlogIndex title="Projects" urlPrefix="projects" posts="{projects}" />

<SubscriptionForm />
