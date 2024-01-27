import { Game } from "./Game";
import { CircleCollider } from "./physics/CircleCollider";
import { EdgeCollider } from "./physics/EdgeCollider";
import { PhysicsEngine } from "./physics/PhysicsEngine";
import { PointMass } from "./physics/PointMass";
import { Vector2D } from "./physics/Vector2D";
import { Player } from "./player";

export class Level {
    game: Game
    camera: Vector2D;
    physicsEngine: PhysicsEngine;
    players: Player[];

    constructor(game: Game, playerImage: ImageBitmap) {
        this.game = game;
        this.camera = new Vector2D(10.0, 10.0);
        this.physicsEngine = new PhysicsEngine();
        
        let pointMass = new PointMass();
        pointMass.position.x = 3.0;
        pointMass.position.y = -3.0;
        pointMass.velocity.set(new Vector2D(2.0, 10.0))
        pointMass.acceleration.set(new Vector2D(0.0, -9.81));
        let circleCollider = new CircleCollider(pointMass, 1.0);
        
        const edgeCollider0 = new EdgeCollider(new Vector2D(8.0, -10.0), new Vector2D(9.0, 10.0));
        const edgeCollider1 = new EdgeCollider(new Vector2D(-10.0, -3.0), new Vector2D(10.0, -2.0));

        this.physicsEngine.addPointMass(pointMass);
        this.physicsEngine.addCircleCollider(circleCollider);
        this.physicsEngine.addEdgeCollider(edgeCollider0);
        this.physicsEngine.addEdgeCollider(edgeCollider1);

        this.players = [new Player(this, circleCollider, playerImage)];
    }

    tick(deltaTime: number) {
        this.physicsEngine.tick(deltaTime);
    }

    render() {
        const renderer = this.game.renderer;
        const canvas = renderer.canvas;
        const halfCanvasWidth = 0.5 * canvas.width;
        const halfCanvasHeight = 0.5 * canvas.height;
        renderer.translate(halfCanvasWidth, halfCanvasHeight);
        renderer.scale(1, -1);
        const cameraAspectRatio = this.camera.x / this.camera.y;
        const canvasAspectRatio = halfCanvasWidth / halfCanvasHeight;   
        let scale;
        if (canvasAspectRatio > cameraAspectRatio) {
            scale = halfCanvasHeight / this.camera.y;
        } else {
            scale = halfCanvasWidth / this.camera.x;
        }
        renderer.scale(scale, scale);

        for (const player of this.players) {
            player.render();
        }
        this.renderEdges();

        renderer.resetTransform();
    }

    renderEdges() {
        const renderer = this.game.renderer;
        for (const edgeCollider of this.physicsEngine.edgeColliders) {
            const start = edgeCollider.start;
            const end = edgeCollider.end;
            renderer.strokeStyle = "white";
            renderer.lineWidth = 0.1;
            renderer.moveTo(start.x, start.y);
            renderer.lineTo(end.x, end.y);
            renderer.stroke();
        }
    }
}
