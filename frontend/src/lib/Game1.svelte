<script lang="ts">
  import { onMount } from "svelte";
  import { Game } from "./game/Game";
  import { Level } from "./game/Level";

  let x = 0;
  let width = 0;
  let height = 0;

  onMount(() => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement;
    const renderer = canvas.getContext("2d");

    let game = new Game(renderer);

    let deltaTimeMilliseconds = 16;
    let deltaTimeSeconds = deltaTimeMilliseconds * 0.001;

    game.load().then(() => {
      window.addEventListener("keydown", (e) => game.onKeyPressed(e));
      window.addEventListener("keyup", (e) => game.onKeyReleased(e));
      window.addEventListener("mousemove", (e) => game.onMouseMoved(e));
      window.addEventListener("mousedown", (e) => game.onMousePressed(e));
      window.addEventListener("mouseup", (e) => game.onMouseReleased(e));
      const interval = setInterval(() => {
        game.tick(deltaTimeSeconds);
        game.render();
      }, deltaTimeMilliseconds);
      return () => clearInterval(interval);
    });
  });

  let count: number = 0;
  const increment = () => {
    count += 1;
  };
</script>

<div>
  <canvas width="900" height="500" id="canvas"></canvas>
</div>

<style>
  div {
    width: 900px;
    height: 500px;
    /* display: flex; */
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
