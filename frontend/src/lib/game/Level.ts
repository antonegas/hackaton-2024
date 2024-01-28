import { Game } from "./Game";
import { MouseEventType, MouseEventWrapper } from "./MouseEventWrapper";
import { Bullet } from "./guns/Bullet";
import { Gun } from "./guns/Gun";
import { CircleCollider } from "./physics/CircleCollider";
import { CollisionListener } from "./physics/CollisionListener";
import { EdgeCollider } from "./physics/EdgeCollider";
import { PhysicsEngine } from "./physics/PhysicsEngine";
import { PointMass } from "./physics/PointMass";
import { Vector2D } from "./physics/Vector2D";
import { Player } from "./player";

export class Level implements CollisionListener {
    game: Game
    camera: Vector2D;
    physicsEngine: PhysicsEngine;
    players: Player[];
    controlledPlayer: Player;
    jumpCounter: number
    
    bullets: Bullet[];

    static maxJumpCounter = 1

    constructor(game: Game, playerImage: ImageBitmap) {
        this.game = game;
        this.camera = new Vector2D(10.0, 10.0);
        this.physicsEngine = new PhysicsEngine();
        this.physicsEngine.collisionListener = this;
        
        let pointMass = new PointMass();
        pointMass.position.x = 3.0;
        pointMass.position.y = -3.0;
        pointMass.velocity.set(new Vector2D(2.0, 10.0))
        pointMass.acceleration.set(new Vector2D(0.0, -9.81));
        let circleCollider = new CircleCollider(pointMass, 1.0);
        
        this.physicsEngine.addEdgeCollider(new EdgeCollider(new Vector2D(-5.0, -3.0), new Vector2D(5.0, -3.0)));
        this.physicsEngine.addEdgeCollider(new EdgeCollider(new Vector2D(-8.0, 2.0), new Vector2D(-4.0, 1.0)));
        this.physicsEngine.addEdgeCollider(new EdgeCollider(new Vector2D(4.0, 1.0), new Vector2D(8.0, 2.0)));
        this.physicsEngine.addEdgeCollider(new EdgeCollider(new Vector2D(4.0, 6.0), new Vector2D(6.0, 6.0)));
        this.physicsEngine.addEdgeCollider(new EdgeCollider(new Vector2D(-9.0, 8.0), new Vector2D(-8.0, -8.0)));

        this.physicsEngine.addPointMass(pointMass);
        this.physicsEngine.addCircleCollider(circleCollider);

        this.controlledPlayer = new Player(this, circleCollider, playerImage)
        this.players = [this.controlledPlayer];
        this.jumpCounter = Level.maxJumpCounter;

        this.bullets = [];

        this.controlledPlayer.gun = this.game.pistol;
    }

    tick(deltaTime: number) {
        this.handleKeyEvents();
        this.handleMouse();
        for (let player of this.players) {
            player.tick(deltaTime);
        }
        this.physicsEngine.tick(deltaTime);
    }

    private handleKeyEvents() {
        while (this.game.hasKeyEvents()) {
            const keyEvent = this.game.popKeyEvent();
            const key = keyEvent.keyboardEvent.key;
            if (keyEvent.pressed) {
                if (key == "a") {
                    this.controlledPlayer.steeringDirection = -1;
                } else if (key == "d") {
                    this.controlledPlayer.steeringDirection = 1;
                } else if (key == "w" || key == " ") {
                    if (this.jumpCounter > 0) {
                        this.controlledPlayer.jump();
                        this.jumpCounter--;
                    }
                }
            } else {
                if (key == "a") {
                    if (this.controlledPlayer.steeringDirection == -1) {
                        this.controlledPlayer.steeringDirection = 0;
                    }
                } else if (key == "d") {
                    if (this.controlledPlayer.steeringDirection == 1) {
                        this.controlledPlayer.steeringDirection = 0;
                    }
                }
            }
        }
    }

    private handleMouse() {
        while (this.game.hasMouseEvents()) {
            const mouseEvent = this.game.popMouseEvent();
            if (mouseEvent.type == MouseEventType.Press) {
                this.controlledPlayer.shoot();
            } else if (mouseEvent.type == MouseEventType.Release) {

            }
        }
        this.controlledPlayer.aimTarget.set(this.transformCanvasPoint(this.game.mousePosition));
    }

    spawnBullet(gun: Gun, circleCollider: CircleCollider, shooter: Player) {
        this.bullets.push(new Bullet(gun, circleCollider, shooter));
        this.physicsEngine.addPointMass(circleCollider.pointMass);
        this.physicsEngine.addCircleCollider(circleCollider);
    }

    private transformCanvasPoint(canvasPoint: Vector2D) {
        const scale = this.computeScale()
        
        const canvas = this.game.renderer.canvas;
        const halfCanvasSize = new Vector2D(0.5 * canvas.width, 0.5 * canvas.height);
        let transformedPoint = Vector2D.subtract(canvasPoint, halfCanvasSize);
        transformedPoint.y *= -1;
        transformedPoint.divide(scale);
        return transformedPoint;
    }

    onEdgeCollision(circleCollider: CircleCollider, edgeCollider: EdgeCollider) {
        if (edgeCollider.normal.y < 0.5) {
            return;
        }
        for (let player of this.players) {
            if (player.circleCollider == circleCollider) {
                this.jumpCounter = Level.maxJumpCounter;
            }
        }
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

        this.renderBullets();
        for (const player of this.players) {
            player.render();
        }
        this.renderEdges();

        renderer.resetTransform();
    }

    renderBullets() {
        for (const bullet of this.bullets) {
            bullet.render();
        }
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

    computeScale() {
        const renderer = this.game.renderer;
        const canvas = renderer.canvas;
        const halfCanvasWidth = 0.5 * canvas.width;
        const halfCanvasHeight = 0.5 * canvas.height;
        const cameraAspectRatio = this.camera.x / this.camera.y;
        const canvasAspectRatio = halfCanvasWidth / halfCanvasHeight;   
        let scale;
        if (canvasAspectRatio > cameraAspectRatio) {
            scale = halfCanvasHeight / this.camera.y;
        } else {
            scale = halfCanvasWidth / this.camera.x;
        }
        return scale;
    }
}
