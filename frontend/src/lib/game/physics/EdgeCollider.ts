import { Vector2D } from "./Vector2D";

export class EdgeCollider {
    start: Vector2D;
    end: Vector2D;
    normal: Vector2D;

    constructor(start: Vector2D, end: Vector2D) {
        this.start = start;
        this.end = end;
        this.normal = Vector2D.subtract(end, start);
        this.normal.rotate90DegreesCCW();
        this.normal.normalize();
    }
}
