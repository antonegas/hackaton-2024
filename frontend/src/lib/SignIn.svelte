<script lang="ts">
  import ActionButton from "./ActionButton.svelte";

  function authWithDiscord() {
    window.location.replace("https://discord.com/api/oauth2/authorize?client_id=1200515855537160323&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2F&scope=identify")
  }
</script>

<div>
  <ActionButton action={authWithDiscord} description={"Continue with Discord"} />
  <ActionButton action={authWithDiscord} description={"Continue as Guest"} />
</div>