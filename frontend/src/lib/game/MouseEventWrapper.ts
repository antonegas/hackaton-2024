export enum MouseEventType {
    Move, 
    Press, 
    Release
}

export class MouseEventWrapper {
    mouseEvent: MouseEvent
    type: MouseEventType

    constructor(mouseEvent: MouseEvent, type: MouseEventType) {
        this.mouseEvent = mouseEvent;
        this.type = type;
    }
}
