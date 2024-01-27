import { Level } from "./Level";
import playerImage from '../../assets/Trollface.png';

export class Game {
  renderer: CanvasRenderingContext2D
  currentLevel: Level;  

  constructor(renderer: CanvasRenderingContext2D) {
    this.renderer = renderer;
    this.currentLevel = null;
  }

  async load() {
    let image = new Image();
    image.src = playerImage;
    return image.decode().then(() => {createImageBitmap(image).then(imageBitmap => {
      this.currentLevel = new Level(this, imageBitmap);
    })});
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
