import { Vector2D } from "./Vector2D";

export class PointMass {
    public position: Vector2D;
    public nextPosition: Vector2D;
    public velocity: Vector2D;
    public acceleration: Vector2D;
    public invertedMass: number;

    constructor() {
        this.position = Vector2D.zero();
        this.nextPosition = Vector2D.zero();
        this.velocity = Vector2D.zero();
        this.acceleration = Vector2D.zero();
        this.invertedMass = 1.0;
    }
    
}
