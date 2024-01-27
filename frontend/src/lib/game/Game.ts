import { Level } from "./Level";

export class Game {
  renderer: CanvasRenderingContext2D
  currentLevel: Level;  

  constructor(renderer: CanvasRenderingContext2D) {
    this.renderer = renderer;
    this.currentLevel = new Level(this);
  }

  tick(deltaTime: number) {
    this.currentLevel.tick(deltaTime);
  }

  render() {
    this.clear();
    this.currentLevel.render();
  }

  private clear() {
    const canvas = this.renderer.canvas;
    this.renderer.clearRect(0, 0, canvas.width, canvas.height);
  }
 
}
