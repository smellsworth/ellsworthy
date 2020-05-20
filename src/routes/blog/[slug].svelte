<script context="module">
  import Node from "../../components/BlogNode/Node.svelte"
  import { loadArticle, loadKudos } from "./_utils"

  export async function preload({ params, query }) {
    try {
      // the `slug` parameter is available because
      // this file is called [slug].svelte
      const [post, kudos] = await Promise.all([
        loadArticle(this.fetch)(params.slug),
        loadKudos(this.fetch)(params.slug),
      ])

      return { post, kudos }
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
  import { sendKudos } from "./_utils"
  export let post
  export let kudos
  let kudosSent = false

  function sendNewKudos() {
    sendKudos(fetch)(post.slug)
    kudosSent = true
  }

  $: displayedKudos = kudosSent ? kudos + 1 : kudos
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

<div>Nb kudos: {displayedKudos}</div>
{#if !kudosSent}
  <button on:click="{sendNewKudos}">Add kudos</button>
{/if}
