<script lang="ts">
  import { onMount } from "svelte";
  import svelteLogo from "./assets/svelte.svg";
  import viteLogo from "/vite.svg";
  import Game1 from "./lib/Game1.svelte";
  import Counter from "./lib/Counter.svelte";
  import SignIn from "./lib/SignIn.svelte";
  import UserInfo from "./lib/UserInfo.svelte";
  import PartyJoin from "./lib/PartyJoin.svelte";
  import SwagH1 from "./lib/SwagH1.svelte";
  import Lobby from "./lib/Lobby.svelte";
  import Party from "./lib/Party.svelte";

  let signedIn: boolean = localStorage.getItem("signedIn") === "true";
  let username: string = localStorage.getItem("username");
  let avatarUrl: string = localStorage.getItem("avatarUrl");
  let partyId: number = null;

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

<!--
{#if !Number.isSafeInteger(partyId)}
  <Lobby {username} {avatarUrl} {signedIn} bind:partyId />
{:else}
  <Party
    id={partyId}
    users={[
      { username: username, avatarUrl: avatarUrl },
      {
        username: "test",
        avatarUrl: "https://api.dicebear.com/7.x/thumbs/svg?seed=test",
      },
    ]}
    owner={true}
  />
{/if}
    -->
<Game1 />
