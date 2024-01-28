<script lang="ts">
  import ActionButton from "./ActionButton.svelte";

  export let username: string;
  export let avatarUrl: string;
  export let partyId: number = null;

  let id: number;

  function join(id) {
    partyId = id;
  }

  function create() {

    let options = {
        method: "POST",
        body: `${username} ${avatarUrl}`,
        headers: {
          "Content-Type": "application/json",
        },
    };

    fetch("/create", options)
    .then((result) => {})
    .catch(console.error);
  }
</script>

<div class="wrapper">
  {#if Number.isSafeInteger(id)}
    <ActionButton action={() => join(id)} description={"Join Party"} />
  {:else}
    <ActionButton action={create} description={"Create Party"} />
  {/if}
  <input type="number" bind:value={id} placeholder="Party Code"/>
</div>

<style>
  .wrapper {
    width: fit-content;
    margin: auto;
  }

  input {
    height: 3rem;
    padding: 0.5rem 1rem;
    margin: 0.5rem;
    border-radius: 0.5rem;
    border: none;
    outline: none;
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    line-height: 3rem;
    width: 15rem;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
</style>