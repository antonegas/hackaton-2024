<script lang="ts">
  let username: string = localStorage.getItem("username");
  let avatarUrl: string = localStorage.getItem("avatarUrl");
</script>

<div class="wrapper">
  <img class="avatar" src={avatarUrl} />
  <p>{username}</p>
</div>

<style>
  .wrapper {
    display: flex;
    flex-direction: row;
    gap: 0.5rem;
    height: 4rem;
    background-color: var(--acent-color);
    width: 100%;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
  }

  .avatar {
    background-color: var(--darker-color);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    margin: auto 0;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    line-height: 4rem;
    height: 4rem;
    padding: 0;
    margin: 0;
  }
</style>