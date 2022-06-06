import { Node, Quat, Vec3 } from "cc";

export const tempVec3: Vec3 = new Vec3();
export const tempQuat: Quat = new Quat();

export function NodeRotateAround(node: Node, point: Vec3, axis: Vec3, angle: number): void {

    node.getPosition(tempVec3);

    Quat.fromAxisAngle(tempQuat, axis, angle);
    Vec3.subtract(tempVec3, tempVec3, point);
    Vec3.transformQuat(tempVec3, tempVec3, tempQuat);
    Vec3.add(tempVec3, point, tempVec3);

    node.getRotation(tempQuat);
    Quat.rotateAround(tempQuat, tempQuat, axis, angle);
    Quat.normalize(tempQuat, tempQuat);

    node.setWorldRotation(tempQuat);
    node.setWorldPosition(tempVec3);
}
