<script lang="ts">
  import ActionButton from "./ActionButton.svelte";

  export let username: string;
  export let avatarUrl: string;

  let id;

  function join(id) {

  }

  function create() {
    let options = {
      body: JSON.stringify({
        username: username,
        avatar_url: avatarUrl
      })
    };

    fetch("/create", options)
    .then((result) => console.log(result))
    .catch(console.error);
  }
</script>

<div class="wrapper">
  {#if id}
    <ActionButton action={() => join(id)} description={"Join Party"} />
  {:else}
    <ActionButton action={create} description={"Create Party"} />
  {/if}
  <input type="number" bind:value={id}/>
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