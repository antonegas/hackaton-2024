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
                if (displacement.dot(edgeCollider.normal) > 0) {
                    continue;
                }
            }
        }
    }

    //private Vector2D intersection

}
