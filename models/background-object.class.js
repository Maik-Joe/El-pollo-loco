class BackgroundObject extends MoveableObject {

    width = 720;
    height = 480;

    /**
     * Creates a new background object.
     * @param {string} imagePath - The path to the background object's image.
     * @param {number} x - The X-coordinate of the background object.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}