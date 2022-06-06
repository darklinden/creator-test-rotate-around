import { IVec3Like, Node, Quat, Vec3 } from "cc";

export const tempVec30: Vec3 = new Vec3();
export const tempVec31: Vec3 = new Vec3();
export const tempQuat: Quat = new Quat();

// public Vector3 TransformDirection(Vector3 direction);
// public Vector3 TransformPoint(Vector3 position);
// public Vector3 TransformVector(Vector3 vector);

/**
 * TransformDirection: rotation only
 * TransformVector: rotation and scale only
 * TransformPoint: position, rotation, and scale
 * */

export function NodeTransformDirection<Out extends IVec3Like>(out: Out, node: Node, vector: Vec3): Out {
    node.getWorldRotation(tempQuat);
    Vec3.transformQuat(out, vector, tempQuat);
    return out;
}

export function NodeTransformVector<Out extends IVec3Like>(out: Out, node: Node, vector: Vec3): Out {

    node.getWorldScale(tempVec30);
    Vec3.multiply(tempVec30, tempVec30, vector);

    NodeTransformDirection(out, node, tempVec30);
    return out;
}

export function NodeTransformPoint<Out extends IVec3Like>(out: Out, node: Node, vector: Vec3): Out {

    NodeTransformVector(tempVec31, node, vector);

    node.getWorldPosition(tempVec30);
    Vec3.add(out, tempVec30, tempVec31);

    return out;
}
