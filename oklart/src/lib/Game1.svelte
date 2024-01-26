<script lang="ts">
  import { onMount } from "svelte";
  import { Game } from "./game/Game";

  let x = 0;

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const renderer = canvas.getContext("2d");

    let game = new Game(renderer);

    let deltaTimeMilliseconds = 20;
    let deltaTimeSeconds = deltaTimeMilliseconds * 0.001;

    const interval = setInterval(() => {
      game.tick(deltaTimeSeconds);
      game.render();
    }, deltaTimeMilliseconds);
    return () => clearInterval(interval);
  });

  let count: number = 0;
  const increment = () => {
    count += 1;
  };
  function startGame() {
    alert("Hello World!");
    console.log("Hello!");
  }
</script>

<div>
  <canvas id="canvas"></canvas>
</div>

<style>
  div {
    width: 100%;
    height: 100%;
    display: flex;
  }
  canvas {
    background-color: black;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
