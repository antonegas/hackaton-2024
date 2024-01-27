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
    background-color: var(--accent-color);
    padding: 0.5rem 1rem;
    margin: 1rem;
    border-radius: 0.5rem;
    color: #fff;
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    line-height: 3rem;
    border: none;
    transition: background-color 0.3s;
  }

  button:hover {
    background-color: var(--hover-color);
  }
</style>