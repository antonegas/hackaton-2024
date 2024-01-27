import { Vector2D } from "../physics/Vector2D"

export class Gun {
    image: ImageBitmap
    centerX: number 
    shootX: number 
    y: number

    Gun(image: ImageBitmap, centerX: number, shootX: number, y: number) {
        this.image = image;
        this.centerX = centerX;
        this.shootX = shootX;
        this.y = y;
    }
}
