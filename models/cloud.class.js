class Cloud extends MoveableObject {
    y = 20; // Vertikale Position
    width = 500; // Breite der Wolke
    height = 200; // Höhe der Wolke
    speed = Math.random() * 0.3 + 0.1; 

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() *  500; // Zufällige Startposition rechts außerhalb des Fensters
        this.speed = 0.15 + Math.random() * 0.3;
        this.animate();
    }

    animate() {
       this.moveLeft();
    }
}
