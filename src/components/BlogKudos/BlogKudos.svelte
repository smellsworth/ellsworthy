<script>
  import { onMount } from "svelte"
  import PizzaSlices from "./PizzaSlices.svelte"
  import KudosButton from "./KudosButton.svelte"
  import { didSendKudos, loadKudos, sendKudos } from "./utils"

  export let type
  export let slug

  let nbKudos = 0
  let status = "NOT_LOADED"
  let kudosSent = false

  const sentInPreviousSession = didSendKudos(type, slug)

  onMount(async () => {
    status = "LOADING"
    try {
      nbKudos = await loadKudos(fetch)(type, slug)
      status = "LOADED"
    } catch (e) {
      status = "FAILED"
    }
  })

  function sendNewKudos() {
    sendKudos(fetch)(type, slug)
    kudosSent = true
  }

  $: displayedKudos = kudosSent ? nbKudos + 1 : nbKudos
</script>

<style>
  .container {
    margin: 32px 0;
    display: flex;
    align-items: flex-start;
  }

  .slice-container {
    width: 50px;
  }

  .nb-kudos {
    margin-bottom: 8px;
    text-align: center;
    font-size: 17px;
    font-weight: 600;
  }
</style>

<div class="container">
  {#if status === 'LOADED'}
    <div class="slice-container">
      <div class="nb-kudos">{displayedKudos}</div>
      <PizzaSlices number="{10}" />
    </div>
    <KudosButton
      sent="{kudosSent || sentInPreviousSession}"
      on:click="{sendNewKudos}"
    />
  {/if}
</div>
