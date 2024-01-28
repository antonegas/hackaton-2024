import { CircleCollider } from "../physics/CircleCollider"
import { PointMass } from "../physics/PointMass"
import { Vector2D } from "../physics/Vector2D"
import { Player } from "../player"
import { Bullet } from "./Bullet"

export class Gun {
    image: ImageBitmap
    centerX: number 
    shootX: number 
    y: number
    scale: number
    bulletImage: ImageBitmap
    bulletScale: number
    bulletHitRadius: number

    Gun(image: ImageBitmap, centerX: number, shootX: number, y: number, scale: number, 
        bulletImage: ImageBitmap, bulletScale: number, bulletHitRadius: number
        ) {
        this.image = image;
        this.centerX = centerX;
        this.shootX = shootX;
        this.y = y;
        this.scale = scale;
        this.bulletImage = bulletImage;
        this.bulletScale = bulletScale;
        this.bulletHitRadius = bulletHitRadius;
    }

    shoot(shooter: Player) {
        const playerPosition = shooter.circleCollider.pointMass.position;
        const direction = Vector2D.subtract(shooter.aimTarget, playerPosition);
        direction.normalize();
        let pointMass = new PointMass();
        pointMass.position.set(playerPosition);
        pointMass.position.addScaled(direction, this.shootX * this.scale);
        pointMass.velocity.set(direction);
        pointMass.velocity.multiply(100.0);
        let circleCollider = new CircleCollider(pointMass, this.bulletHitRadius);
        shooter.level.spawnBullet(this, circleCollider, shooter);
    }
}
