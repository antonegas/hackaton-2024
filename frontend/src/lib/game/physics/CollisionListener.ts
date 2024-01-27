import { CircleCollider } from "./CircleCollider";
import { EdgeCollider } from "./EdgeCollider";

export abstract class CollisionListener {
    abstract onEdgeCollision(circleCollider: CircleCollider, edgeCollider: EdgeCollider);
}
