import { PointMass } from "./PointMass"

class CircleCollider {
    pointMass: PointMass
    radius: number

    constructor(pointMass: PointMass, radius: number) {
        this.pointMass = pointMass;
        this.radius = radius;
    }
}
