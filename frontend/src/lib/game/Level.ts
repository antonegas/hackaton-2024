import { Game } from "./Game";
import { AxisAlignedBox } from "./physics/AxisAlignedBox";
import { CircleCollider } from "./physics/CircleCollider";
import { PhysicsEngine } from "./physics/PhysicsEngine";
import { PointMass } from "./physics/PointMass";
import { Vector2D } from "./physics/Vector2D";
import { Player } from "./player";

export class Level {
    game: Game
    camera: AxisAlignedBox;
    physicsEngine: PhysicsEngine;
    players: Player[];

    constructor(game: Game) {
        this.game = game;
        this.camera = new AxisAlignedBox(new Vector2D(-10.0, -10.0), new Vector2D(10.0, 10.0));
        this.physicsEngine = new PhysicsEngine();
        let pointMass = new PointMass();
        pointMass.velocity.set(new Vector2D(100.0, 100.0))
        pointMass.acceleration.set(new Vector2D(0.0, -100.0));
        let circleCollider = new CircleCollider(pointMass, 10.0);
        this.physicsEngine.addPointMass(pointMass);
        this.physicsEngine.addCircleCollider(circleCollider);
        this.players = [new Player(this, circleCollider)];
    }

    tick(deltaTime: number) {
        this.physicsEngine.tick(deltaTime);
    }

    render() {
        for (const player of this.players) {
            player.render();
        }
    }
}
