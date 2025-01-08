class Cloud extends MoveableObject {
    y = 20; // Vertikale Position
    width = 500; // Breite der Wolke
    height = 200; // Höhe der Wolke
    speed = Math.random() * 0.2 + 0.1; 

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() * 3000; 
        this.speed = 0.1 + Math.random() * 0.2;
        this.animate();
    }

    animate() {
       this.moveLeft();
    }
}
