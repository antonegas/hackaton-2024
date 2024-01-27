import { Vector2D } from "./physics/Vector2D";

export function renderImage(
    renderer: CanvasRenderingContext2D, image: ImageBitmap, 
    position: Vector2D, scale: number
) {
    renderer.save();

    const scaledWidth = scale * image.width;
    const scaledHeight = scale * image.height;
    const halfScaledWidth = 0.5 * scaledWidth;
    const halfScaledHeight = 0.5 * scaledHeight;

    renderer.translate(position.x - halfScaledWidth, position.y + halfScaledHeight);
    renderer.scale(1, -1);
    renderer.drawImage(image, 0.0, 0.0, scaledWidth, scaledHeight);

    renderer.restore();
};
