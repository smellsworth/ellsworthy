<script>
  import { onMount } from "svelte"
  import PizzaSlices from "./PizzaSlices.svelte"
  import KudosButton from "./KudosButton.svelte"
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
    // sendKudos(fetch)(slug)
    kudosSent = true
  }

  function createPizza() {
    pizzaStatus = "preparing"
  }

  function cancelPizza() {
    pizzaStatus = "not_started"
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
    <KudosButton sent="{kudosSent}" on:click="{sendNewKudos}" />
  {/if}
</div>
