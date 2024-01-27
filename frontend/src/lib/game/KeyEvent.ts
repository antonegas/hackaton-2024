export class KeyEvent {
    keyboardEvent: KeyboardEvent
    pressed: boolean

    constructor(keyboardEvent: KeyboardEvent, pressed: boolean) {
        this.keyboardEvent = keyboardEvent;
        this.pressed = pressed;
    }
}
