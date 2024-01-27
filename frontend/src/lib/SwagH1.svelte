<script lang="ts">
  export let text: string;
  export let duration: number;
  $: delay = duration / text.length;
</script>

<h1>
    {#each text.split("") as c, index}
        <span style={`--duration: ${duration}s; --delay: ${delay * index}s;`}>{c}</span>
    {/each}
</h1>

<style>
  span {
    display: inline-block;
    font-family: 'Sixtyfour', sans-serif;
    font-size: 5rem;
    font-weight: 400;
    color: var(--primary-color);
    transform: translate(100px, 0);
    animation: var(--duration) ease-in-out var(--delay) infinite swag;
    white-space: pre;
  }

  h1 {
    font-family: 'Sixtyfour', sans-serif;
    font-size: 5rem;
    font-weight: 400;
    text-align: center;
    color: var(--primary-color);
    animation: 2s ease-in-out 0s infinite swag;
  }

  @keyframes swag {
  0% {
    transform: translate(0, 0);
    text-shadow: 0.125rem 0.125rem 0 var(--accent-color),
    0.25rem 0.25rem 0 var(--accent-color),
    0.375rem 0.375rem 0 var(--accent-color),
    0.5rem 0.5rem 0 var(--accent-color);
  }
  50% {
    transform: translate(0.5rem, 0.5rem);
    text-shadow: 0 0 0 var(--primary-color);
  }
  100% {
    transform: translate(0, 0);
    text-shadow: 0.125rem 0.125rem 0 var(--accent-color),
    0.25rem 0.25rem 0 var(--accent-color),
    0.375rem 0.375rem 0 var(--accent-color),
    0.5rem 0.5rem 0 var(--accent-color);
  }
}
</style>