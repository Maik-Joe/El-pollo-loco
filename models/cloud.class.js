class Cloud extends MoveableObject {
    
    y = 20;
    width = 500;
    height = 200;
    speed = Math.random() * 0.2 + 0.1;

    /**
     * Creates a new Cloud instance, loads its image, sets a random position, and starts its movement.
     * @param {string} imagePath - The path to the cloud image.
     */
    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * 3000;
        this.speed = 0.1 + Math.random() * 0.2;
        this.animate();
    }

    /**
     * Moves the cloud to the left at a set interval.
     */
    animate() {
        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    }
}
