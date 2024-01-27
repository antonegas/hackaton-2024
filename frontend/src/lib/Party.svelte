<script lang="ts">
  import { onMount } from "svelte";
  import SwagH1 from "./SwagH1.svelte";

  type User = {
    username: string,
    avatarUrl: string
  }

  export let self: User;
  export let users: User[];
  export let id: number;

  window.location.href = `party/${id}`
</script>

<SwagH1 text={id.toString()} duration={2}/>