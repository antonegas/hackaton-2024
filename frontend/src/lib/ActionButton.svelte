<script lang="ts">
  export let action;
  export let description;
</script>

<button on:click={action}>
  {description}
</button>

<style>
  button {
    height: 4rem;
    background-color: var(--acent-color);
    padding: 0.5rem;
    margin: auto;
    border-radius: 0.5rem;
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    line-height: 3rem;
    border: none;
  }
</style>