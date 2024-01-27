<script lang="ts">
    import UserInfo from "./UserInfo.svelte";


  type User = {
    username: string,
    avatarUrl: string
  }

  export let users: User[];
</script>

<div class="info-wrapper">
    {#each users as user}
        <UserInfo username={user.username} avatarUrl={user.avatarUrl} />
    {/each}
</div>

