import { CircleCollider } from "../physics/CircleCollider";
import { Gun } from "./Gun";
import { renderImage } from "../imageRendering";
import { Player } from "../player";

export class Bullet {
    gun: Gun
    circleCollider: CircleCollider
    shooter: Player

    constructor(gun: Gun, circleCollider: CircleCollider, shooter: Player) {
        this.gun = gun;
        this.circleCollider = circleCollider;
        this.shooter = shooter;
    }

    onPlayerHit(hitPlayer: Player) {
        hitPlayer.circleCollider.pointMass.velocity.addScaled(
            this.circleCollider.pointMass.velocity, 
            0.1
        );
    }

    render() {
        console.log(this.circleCollider.pointMass.position);
        renderImage(
            this.shooter.level.game.renderer, 
            this.gun.bulletImage, 
            this.circleCollider.pointMass.position, 
            this.gun.bulletScale
        );
    }
}
