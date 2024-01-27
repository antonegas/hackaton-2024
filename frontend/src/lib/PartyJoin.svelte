<script lang="ts">
  import ActionButton from "./ActionButton.svelte";

  
</script>

<div class="wrapper">
  <ActionButton action={authWithDiscord} description={"Create Party"} />
  <ActionButton action={authWithDiscord} description={"Join Party"} />
</div>

<style>
  .wrapper {
    width: fit-content;
    margin: auto;
  }
</style>