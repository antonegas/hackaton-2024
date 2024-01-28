import { Level } from "./Level";
import playerImage from '../../assets/Trollface.png';
import { KeyEvent } from "./KeyEvent";
import { Gun } from "./guns/Gun";
import pistolJson from "../../assets/pistol/pistol.json";
import { Vector2D } from "./physics/Vector2D";
import { MouseEventType, MouseEventWrapper } from "./MouseEventWrapper";

export class Game {
  renderer: CanvasRenderingContext2D
  currentLevel: Level;  
  keyEvents: KeyEvent[];
  mouseEvents: MouseEventWrapper[];
  mousePosition: Vector2D;

  pistol: Gun

  constructor(renderer: CanvasRenderingContext2D) {
    this.renderer = renderer;
    this.currentLevel = null;
    this.keyEvents = [];
    this.mouseEvents = [];
    this.pistol = null;
    this.mousePosition = Vector2D.zero();
  }

  async load() {
    let image = new Image();
    image.src = playerImage;
    
    let pistolImage = new Image();
    pistolImage.src = pistolJson.weapon.image;

    let pistolBulletImage = new Image();
    pistolBulletImage.src = pistolJson.bullet;

    this.pistol = new Gun();
    const pistolScale = 0.002;
    this.pistol.centerX = pistolJson.weapon.position.centerX;
    this.pistol.shootX = pistolJson.weapon.position.shootX;
    this.pistol.y = pistolJson.weapon.position.y;
    this.pistol.scale = pistolScale;
    this.pistol.bulletScale = 0.001;
    this.pistol.bulletHitRadius = 0.1;
    
    return Promise.all([
      image.decode().then(() => {createImageBitmap(image).then(imageBitmap => {
        this.currentLevel = new Level(this, imageBitmap);
      })}), 
      pistolImage.decode().then(() => {createImageBitmap(pistolImage).then(pistolBitmap => {
        this.pistol.image = pistolBitmap;
      })}), 
      pistolBulletImage.decode().then(() => {createImageBitmap(pistolBulletImage).then(pistolBulletBitmap => {
        this.pistol.bulletImage = pistolBulletBitmap;
      })})
    ]).then(() => {
      this.currentLevel.controlledPlayer.gun = this.pistol;
    });
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

  onMouseMoved(mouseEvent: MouseEvent) {
    this.mousePosition.x = mouseEvent.offsetX;
    this.mousePosition.y = mouseEvent.offsetY;
    //this.mouseEvents.push(new MouseEventWrapper(mouseEvent, MouseEventType.Move));
  }

  onMousePressed(mouseEvent: MouseEvent) {
    this.mouseEvents.push(new MouseEventWrapper(mouseEvent, MouseEventType.Press));
  }

  onMouseReleased(mouseEvent: MouseEvent) {
    this.mouseEvents.push(new MouseEventWrapper(mouseEvent, MouseEventType.Release));
  }

  tick(deltaTime: number) {
    this.currentLevel.tick(deltaTime);
  }

  hasKeyEvents() {
    return this.keyEvents.length != 0;
  }

  hasMouseEvents() {
    return this.mouseEvents.length != 0;
  }

  popKeyEvent() {
    return this.keyEvents.pop();
  }

  popMouseEvent() {
    return this.mouseEvents.pop();
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
