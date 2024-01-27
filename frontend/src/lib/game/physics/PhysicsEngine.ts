import { PointMass } from "./PointMass";
import { CircleCollider } from "./CircleCollider";
import { EdgeCollider } from "./EdgeCollider";
import { Vector2D } from "./Vector2D";

export class PhysicsEngine {
    pointMasses: PointMass[];
    circleColliders: CircleCollider[];
    edgeColliders: EdgeCollider[];
    subSteps: number;

    constructor() {
        this.pointMasses = [];
        this.circleColliders = [];
        this.edgeColliders = [];
        this.subSteps = 10;
    }

    addPointMass(pointMass: PointMass) {
        this.pointMasses.push(pointMass);
    }

    addCircleCollider(circleCollider: CircleCollider) {
        this.circleColliders.push(circleCollider);
    }

    addEdgeCollider(edgeCollider: EdgeCollider) {
        this.edgeColliders.push(edgeCollider);
    }

    tick(deltaTime: number) {
        const subDeltaTime = deltaTime / this.subSteps;

        for (let i = 0; i < this.subSteps; i++) {
            for (let pointMass of this.pointMasses) {
                pointMass.velocity.addScaled(pointMass.acceleration, subDeltaTime);
                pointMass.nextPosition.set(Vector2D.addScaled(
                    pointMass.position, pointMass.velocity, subDeltaTime));
            }

            this.solveConstraintsLocally();

            for (let pointMass of this.pointMasses) {
                pointMass.velocity.set(
                    Vector2D.divide(
                        Vector2D.subtract(pointMass.nextPosition, pointMass.position), 
                        subDeltaTime
                    )
                );
                pointMass.position.set(pointMass.nextPosition);
            }
        }

    }

    private solveConstraintsLocally() {
        this.solveDistanceConstraintsLocally();
        this.solveCollisionsLocally();
    }

    private solveDistanceConstraintsLocally() {

    }

    private solveCollisionsLocally() {
        this.solveCircleCollisionsLocally();
        this.solveEdgeCollisionsLocally();
    }

    private solveCircleCollisionsLocally() {

    }

    private solveEdgeCollisionsLocally() {
        for (let circleCollider of this.circleColliders) {
            let pointMass = circleCollider.pointMass;
            const displacement = Vector2D.subtract(pointMass.nextPosition, pointMass.position);
            for (const edgeCollider of this.edgeColliders) {
                if (displacement.dot(edgeCollider.normal) > 0.0) {
                    continue;
                }
                const start0 = Vector2D.addScaled(
                    pointMass.position, edgeCollider.normal, -circleCollider.radius);

                const edgeDisplacement = Vector2D.subtract(edgeCollider.end, edgeCollider.start);
                const intersection = PhysicsEngine.findIntersection(
                    start0, displacement, edgeCollider.start, edgeDisplacement);
                if (intersection != null) {
                    const penetration = circleCollider.radius - 
                    Vector2D.subtract(pointMass.nextPosition, edgeCollider.start).dot(edgeCollider.normal);
                    pointMass.nextPosition.addScaled(edgeCollider.normal, penetration);
                }
            }
        }
    }

    private static findIntersection(
        start0: Vector2D, displacement0: Vector2D, 
        start1: Vector2D, displacement1: Vector2D
    ) {
        const denominator = displacement0.cross(displacement1);
        if (Math.abs(denominator) < 0.0001) {
            return null;
        }
        const startDisplacement = Vector2D.subtract(start1, start0);
        const t0 = startDisplacement.cross(displacement1) / denominator;
        const t1 = -displacement0.cross(startDisplacement) / denominator;
        console.log(t0);
        if (-0.1 < t0 && t0 < 1.1 && -0.1 < t1 && t1 < 1.1) {
            return Vector2D.addScaled(start0, displacement0, t0);
        }
        return null;
    }

}
