import { PointMass } from "./PointMass";
import { CircleCollider } from "./CircleCollider";

class PhysicsEngine {
    pointMasses: PointMass[];
    circleColliders: CircleCollider[];

    constructor() {
        this.pointMasses = [];
        this.circleColliders = [];
    }

    addPointMass(pointMass: PointMass) {
        this.pointMasses.push(pointMass);
    }

    addCircleCollider(circleCollider: CircleCollider) {
        this.circleColliders.push(circleCollider);
    }

    tick(deltaTime: number) {
        
    }
}
