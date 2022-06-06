import { Component, EventKeyboard, EventMouse, Input, input, KeyCode, Quat, Vec3, _decorator } from "cc";
import { StartCoroutine, waitForNextFrame } from "./lib/Coroutine";
import { NodeRotateAround } from "./NodeRotateAround";
const { ccclass, property } = _decorator;

const KEYS = [
    KeyCode.KEY_W, KeyCode.ARROW_UP,
    KeyCode.KEY_S, KeyCode.ARROW_DOWN,
    KeyCode.KEY_A, KeyCode.ARROW_LEFT,
    KeyCode.KEY_D, KeyCode.ARROW_RIGHT,
];

export const tempVec3: Vec3 = new Vec3();

@ccclass("TestRotateAround")
export class TestRotateAround extends Component {

    start() {
        // Your initialization goes here.
        input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
        input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
        StartCoroutine(this, this.rotate());
    }


    private aix: Map<KeyCode, boolean> = new Map();
    onKeyDown(e: EventKeyboard) {
        if (KEYS.indexOf(e.keyCode) != -1)
            this.aix.set(e.keyCode, true);
    }

    onKeyUp(e: EventKeyboard) {
        if (KEYS.indexOf(e.keyCode) != -1)
            this.aix.set(e.keyCode, false);
    }

    *rotate() {
        while (true) {
            yield waitForNextFrame;

            let up = this.aix.get(KeyCode.KEY_W) || this.aix.get(KeyCode.ARROW_UP);
            let down = this.aix.get(KeyCode.KEY_S) || this.aix.get(KeyCode.ARROW_DOWN);
            let left = this.aix.get(KeyCode.KEY_A) || this.aix.get(KeyCode.ARROW_LEFT);
            let right = this.aix.get(KeyCode.KEY_D) || this.aix.get(KeyCode.ARROW_RIGHT);

            Vec3.zero(tempVec3);
            if (up) Vec3.add(tempVec3, tempVec3, Vec3.UNIT_Y);
            if (down) Vec3.subtract(tempVec3, tempVec3, Vec3.UNIT_Y);
            if (left) Vec3.subtract(tempVec3, tempVec3, Vec3.UNIT_X);
            if (right) Vec3.add(tempVec3, tempVec3, Vec3.UNIT_X);

            if (!Vec3.equals(tempVec3, Vec3.ZERO)) NodeRotateAround(this.node, Vec3.ZERO, tempVec3, Math.PI / 180);
        }
    }
}