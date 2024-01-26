import { Vector2D } from "Vector2D";

export class PointMass {
    private position: Vector2D;
    private velocity: Vector2D;
    private acceleration: Vector2D;
    private invertedMass: number;

    constructor() {
        this.position = Vector2D.zero();
        this.velocity = Vector2D.zero();
        this.acceleration = Vector2D.zero();
        this.invertedMass = 1.0;
    }
    
    
}
