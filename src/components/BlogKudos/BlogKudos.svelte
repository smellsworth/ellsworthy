<script>
  import { onMount } from "svelte"
  import { loadKudos, sendKudos } from "./utils"

  export let slug

  let nbKudos = 0
  let status = "NOT_LOADED"
  let kudosSent = false

  onMount(async () => {
    status = "LOADING"
    try {
      nbKudos = await loadKudos(fetch)(slug)
      status = "LOADED"
    } catch (e) {
      status = "FAILED"
    }
  })

  function sendNewKudos() {
    sendKudos(fetch)(slug)
    kudosSent = true
  }

  $: displayedKudos = kudosSent ? nbKudos + 1 : nbKudos
</script>

{#if status === 'LOADED'}
  <div>Nb kudos: {displayedKudos}</div>
  {#if !kudosSent}
    <button on:click="{sendNewKudos}">Add kudos</button>
  {/if}
{/if}
