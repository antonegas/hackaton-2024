<script lang="ts">
  export let username: string;
  export let avatarUrl: string;
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
    background-color: var(--accent-color);
    width: 100%;
    padding: 0 0.5rem;
    border-radius: 2rem;
    margin: 1rem 0;
    transform: translate(0, 0);
    box-shadow: 0.5rem 0.5rem 0 var(--primary-color), 
    0.25rem 0.25rem 0 var(--primary-color);
    transition: all 0.2s;
  }

  .wrapper:hover {
    transform: translate(0.5rem, 0.5rem);
    box-shadow: 0 0 0 var(--primary-color);
  }

  .avatar {
    background-color: var(--hover-color);
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    margin: auto 0;
  }

  p {
    font-family: 'Open Sans', sans-serif;
    font-size: 2rem;
    line-height: 4rem;
    text-align: right;
    width: 100%;
    height: 4rem;
    padding: 0;
    margin: 0 0.5rem;
  }
</style>