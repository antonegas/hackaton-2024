import { Level } from "./Level";
import { CircleCollider } from "./physics/CircleCollider";

export class Player {
    level: Level
    circleCollider: CircleCollider

    constructor(level: Level, circleCollider: CircleCollider) {
        this.level = level;
        this.circleCollider = circleCollider;
    }

    render() {
        const renderer = this.level.game.renderer;
        renderer.beginPath();
        const position = this.circleCollider.pointMass.position;
        renderer.arc(position.x, position.y, this.circleCollider.radius, 0.0, 2.0 * Math.PI);
        renderer.strokeStyle = "white";
        renderer.stroke();
    }
}
