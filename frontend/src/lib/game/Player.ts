import { Level } from "./Level";
import { CircleCollider } from "./physics/CircleCollider";
import { renderImage } from "./imageRendering";
import { Vector2D } from "./physics/Vector2D";
import { Gun } from "./guns/Gun";

export class Player {
    level: Level
    circleCollider: CircleCollider
    image: ImageBitmap
    steeringDirection: number
    gun: Gun
    aimTarget: Vector2D

    constructor(level: Level, circleCollider: CircleCollider, image: ImageBitmap) {
        this.level = level;
        this.circleCollider = circleCollider;
        this.image = image;
        this.steeringDirection = 0.0;
        this.gun = null;
        this.aimTarget = Vector2D.zero();
    }

    tick(deltaTime: number) {
        this.circleCollider.pointMass.acceleration.x = 10.0 * this.steeringDirection;
    }

    jump() {
        this.circleCollider.pointMass.velocity.y += 10;
    }

    shoot() {
        console.log("Shoot!");
        this.gun.shoot(this);
    }

    render() {
        const renderer = this.level.game.renderer;
        const position = this.circleCollider.pointMass.position;
        const radius = this.circleCollider.radius;
        
        renderer.save();
        renderer.translate(position.x, position.y);

        renderer.save();
        const angle = -position.x / radius;
        renderer.rotate(angle);

        renderer.beginPath();
        renderer.lineWidth = 0;
        renderer.strokeStyle = "white";
        renderer.arc(0.0, 0.0, radius, 0.0, 2.0 * Math.PI);
        renderer.stroke();
        renderer.clip();

        const halfImageWidth = 0.5 * this.image.width;
        const halfImageHeight = 0.5 * this.image.height;
        let imageScale = radius / (halfImageWidth > halfImageHeight ? halfImageHeight : halfImageWidth);
        renderImage(renderer, this.image, Vector2D.zero(), imageScale);
        renderer.restore();

        if (this.gun) {
            renderer.save();
            renderer.beginPath();
            const direction = Vector2D.subtract(this.aimTarget, position);
            if (direction.getLengthSquared() < 0.001) {
                direction.x = 1.0;
                direction.y = 0.0;
            }
            const angle = direction.getAngle();
            renderer.rotate(angle);
            let offset = new Vector2D(0.5 * this.gun.image.width, 0.5 * this.gun.image.height);
            offset.x -= this.gun.centerX;
            offset.y -= this.gun.y;
            offset.x *= this.gun.scale;
            offset.y *= -this.gun.scale;
            renderImage(renderer, this.gun.image, offset, this.gun.scale);
            renderer.restore();
        }

        renderer.restore();
    }
}
