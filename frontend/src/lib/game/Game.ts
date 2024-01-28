import { Level } from "./Level";
import playerImage from '../../assets/Trollface.png';
import { KeyEvent } from "./KeyEvent";
import { Gun } from "./guns/Gun";
import pistolJson from "../../assets/pistol/pistol.json";
import { Vector2D } from "./physics/Vector2D";

export class Game {
  renderer: CanvasRenderingContext2D
  currentLevel: Level;  
  keyEvents: KeyEvent[];

  pistol: Gun

  constructor(renderer: CanvasRenderingContext2D) {
    this.renderer = renderer;
    this.currentLevel = null;
    this.keyEvents = [];
    this.pistol = null;
  }

  async load() {
    let image = new Image();
    image.src = playerImage;
    
    this.pistol = new Gun();
    this.pistol.centerX = pistolJson.weapon.position.centerX;
    this.pistol.shootX = pistolJson.weapon.position.shootX;
    this.pistol.y = pistolJson.weapon.position.y;
    let pistolImage = new Image();
    pistolImage.src = `${pistolJson.weapon.image}`;
    
    return Promise.all([
      image.decode().then(() => {createImageBitmap(image).then(imageBitmap => {
        this.currentLevel = new Level(this, imageBitmap);
      })}), 
      pistolImage.decode().then(() => {createImageBitmap(pistolImage).then(pistolBitmap => {
        this.pistol.image = pistolBitmap;
      })})
    ]);
  }

  onKeyPressed(keyBoardEvent: KeyboardEvent) {
    const keyEvent = new KeyEvent(keyBoardEvent, true);
    if (!keyEvent.keyboardEvent.repeat) {
      this.keyEvents.push(keyEvent);
    }
  }

  onKeyReleased(keyBoardEvent: KeyboardEvent) {
    this.keyEvents.push(new KeyEvent(keyBoardEvent, false));
  }

  tick(deltaTime: number) {
    this.currentLevel.tick(deltaTime);
  }

  hasKeyEvents() {
    return this.keyEvents.length != 0;
  }

  popKeyEvent() {
    return this.keyEvents.pop();
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
