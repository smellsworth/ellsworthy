<script>
  import { onMount } from "svelte"
  import PizzaSliceAnimable from "../PizzaSlice/PizzaSliceAnimable.svelte"
  import { loadKudos, sendKudos } from "./utils"

  export let slug

  let nbKudos = 0
  let status = "NOT_LOADED"
  let kudosSent = false
  let pizzaStatus = "not_started"

  onMount(async () => {
    status = "LOADING"
    try {
      nbKudos = await loadKudos(fetch)(slug)
      status = "LOADED"
    } catch (e) {
      status = "FAILED"
    }
  })

  // function sendNewKudos() {
  //   sendKudos(fetch)(slug)
  //   kudosSent = true
  // }

  function createPizza() {
    pizzaStatus = "preparing"
  }

  function cancelPizza() {
    pizzaStatus = "not_started"
  }

  $: displayedKudos = kudosSent ? nbKudos + 1 : nbKudos
</script>

{#if status === 'LOADED'}
  <div>Nb kudos: {displayedKudos}</div>

  <PizzaSliceAnimable status="{pizzaStatus}" />
  {#if !kudosSent}
    <button
      on:mousedown="{createPizza}"
      on:mouseup="{cancelPizza}"
      on:mouseleave="{cancelPizza}"
    >
      Hold button to prepare new pizza slice
    </button>
  {/if}
{/if}
