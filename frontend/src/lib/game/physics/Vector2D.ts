export class Vector2D {
    x: number
    y: number
    
    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    static zero() {
        return new Vector2D(0.0, 0.0);
    }

    static subtract(vector0: Vector2D, vector1: Vector2D) {
        return new Vector2D(
            vector0.x - vector1.x, 
            vector0.y - vector1.y
        );
    }

    static divide(vector: Vector2D, scaler: number) {
        return new Vector2D(
            vector.x / scaler, 
            vector.y / scaler
        );
    }

    static addScaled(vector0: Vector2D, vector1: Vector2D, vector1Scaler: number) {
        return new Vector2D(
            vector0.x + vector1.x * vector1Scaler, 
            vector0.y + vector1.y * vector1Scaler
        )
    }

    set(vector: Vector2D) {
        this.x = vector.x;
        this.y = vector.y;
    }

    divide(scaler: number) {
        this.x /= scaler;
        this.y /= scaler;
    }

    addScaled(vector: Vector2D, scaler: number) {
        this.x += vector.x * scaler;
        this.y += vector.y * scaler;
    }

    rotate90DegreesCCW() {
        const oldX = this.x;
        this.x = -this.y;
        this.y = oldX;
    }

    getLength() {
        return Math.sqrt(this.x * this.x + this.y * this.y); 
    }

    normalize() {
        this.divide(this.getLength());
    }

    dot(vector: Vector2D) {
        return this.x * vector.x + this.y * vector.y;
    }
}
