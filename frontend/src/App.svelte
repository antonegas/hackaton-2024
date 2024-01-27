<script lang="ts">
  import { onMount } from "svelte";
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Game1 from "./lib/Game1.svelte";
  import Counter from "./lib/Counter.svelte";
  import SignIn from "./lib/SignIn.svelte";
  import UserInfo from "./lib/UserInfo.svelte";

  let signedIn: boolean = localStorage.getItem("signedIn") === "true";

  onMount(() => {
    const fragment = new URLSearchParams(window.location.hash.slice(1));
    const [accessToken, tokenType] = [
      fragment.get("access_token"),
      fragment.get("token_type"),
    ];

    if (!accessToken) {
      return;
    }

    fetch("https://discord.com/api/users/@me", {
      headers: {
        authorization: `${tokenType} ${accessToken}`,
      },
    })
      .then((result) => result.json())
      .then((response) => {
        console.log(response);
        const { id, username, avatar } = response;
        localStorage.setItem("signedIn", "true");
        localStorage.setItem("username", username);
        if (avatar) {
          localStorage.setItem(
            "avatarUrl",
            `https://cdn.discordapp.com/avatars/${id}/${avatar}.png`
          );
        } else {
          localStorage.setItem(
            "avatarUrl",
            `https://api.dicebear.com/7.x/thumbs/svg?seed=${username}`
          );
        }
        window.location.href = "/";
      })
      .catch(console.error);
  });
</script>

<!--<h1>Ball Pit</h1>

{#if !signedIn}
  <SignIn />
{:else}
  <UserInfo />
{/if}-->

<Game1 />

<!-- <main>
  <div>
    <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
      <img src={viteLogo} class="logo" alt="Vite Logo" />
    </a>
    <a href="https://svelte.dev" target="_blank" rel="noreferrer">
      <img src={svelteLogo} class="logo svelte" alt="Svelte Logo" />
    </a>
  </div>
  <h1>Vite + Svelte</h1>

  <div class="card">
    <Counter />
  </div>

  <p>
    Check out <a href="https://github.com/sveltejs/kit#readme" target="_blank" rel="noreferrer">SvelteKit</a>, the official Svelte app framework powered by Vite!
  </p>

  <p class="read-the-docs">
    Click on the Vite and Svelte logos to learn more
  </p>
</main> -->

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
</style>
