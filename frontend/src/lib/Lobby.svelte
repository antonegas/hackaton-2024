<script lang="ts">
  import SignIn from "./SignIn.svelte";
  import UserInfo from "./UserInfo.svelte";
  import SwagH1 from "./SwagH1.svelte";
  import PartyJoin from "./PartyJoin.svelte";

  export let username;
  export let avatarUrl;
  export let signedIn;
</script>

<SwagH1 text={"Ball Pit"} duration={2}/>

<div class="info-wrapper">
  {#if !signedIn}
    <SignIn />
  {:else}
    <UserInfo username={username} avatarUrl={avatarUrl}/>
    <PartyJoin username={username} avatarUrl={avatarUrl} />
  {/if}
</div>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

  h1 {
    font-family: 'Sixtyfour', sans-serif;
    font-size: 5rem;
    font-weight: 400;
    text-align: center;
    color: var(--primary-color);
    animation: 2s ease-in-out 0s infinite swag;
  }
</style>