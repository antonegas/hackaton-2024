import { Level } from "./Level";
import { CircleCollider } from "./physics/CircleCollider";
import { renderImage } from "./imageRendering";
import { Vector2D } from "./physics/Vector2D";

export class Player {
    level: Level
    circleCollider: CircleCollider
    image: ImageBitmap

    constructor(level: Level, circleCollider: CircleCollider, image: ImageBitmap) {
        this.level = level;
        this.circleCollider = circleCollider;
        this.image = image;
    }

    render() {
        const renderer = this.level.game.renderer;
        const position = this.circleCollider.pointMass.position;
        const radius = this.circleCollider.radius;
        renderer.save();

        renderer.translate(position.x, position.y);
        const angle = -position.x / radius;
        renderer.rotate(angle);

        renderer.beginPath();
        renderer.lineWidth = 0.1;
        renderer.strokeStyle = "white";
        renderer.arc(0.0, 0.0, radius, 0.0, 2.0 * Math.PI);
        renderer.stroke();
        renderer.clip();

        const halfImageWidth = 0.5 * this.image.width;
        const halfImageHeight = 0.5 * this.image.height;
        let imageScale = radius / (halfImageWidth > halfImageHeight ? halfImageHeight : halfImageWidth);
        renderImage(renderer, this.image, Vector2D.zero(), imageScale);

        renderer.restore();
    }
}
