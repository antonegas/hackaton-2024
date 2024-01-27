<script lang="ts">
  import ActionButton from "./ActionButton.svelte";

  function authWithDiscord() {
    // window.location.replace("https://discord.com/api/oauth2/authorize?client_id=1200515855537160323&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&scope=identify")
    window.location.replace("https://discord.com/api/oauth2/authorize?client_id=1200515855537160323&response_type=token&redirect_uri=http%3A%2F%2F192.168.168.218%3A5173%2F&scope=identify")
  }
</script>

<div class="wrapper">
  <ActionButton action={authWithDiscord} description={"Continue with Discord"} />
</div>

<style>
  .wrapper {
    width: fit-content;
    margin: auto;
  }
</style>