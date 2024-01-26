export class Game {
  renderer: CanvasRenderingContext2D
  x: number;

  constructor(renderer: CanvasRenderingContext2D) {
    this.renderer = renderer;
    this.x = 0;
  }

  tick(deltaTime: number) {
    this.x += 10.0 * deltaTime;
  }

  render() {
    this.clear();
    this.renderer.fillStyle = "red";
    this.renderer.fillRect(this.x, 0, 10, 10);
  }

  private clear() {
    const canvas = this.renderer.canvas;
    this.renderer.clearRect(0, 0, canvas.width, canvas.height);
  }
 
}
