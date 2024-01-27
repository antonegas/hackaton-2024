<script lang="ts">
    import ActionButton from "./ActionButton.svelte";
import PartyList from "./PartyList.svelte";
    import SwagH1 from "./SwagH1.svelte";

  type User = {
    username: string,
    avatarUrl: string
  }

  export let users: User[];
  export let owner = false;
  export let id: number;

  function start(id) {

  }
</script>

<SwagH1 text={id.toString()} duration={2} />
<PartyList users={users} />
<div class="center-button">
  <ActionButton action={() => {start(id)}} description={"Start Party"} />
</div>

<style>
  .center-button {
    display: flex;
    justify-content: center;
  }
</style>