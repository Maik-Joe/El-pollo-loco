class Cloud extends MoveableObject {
    y = 20; // Vertikale Position
    x = 800; // Startposition (am rechten Rand des Fensters)
    width = 500; // Breite der Wolke
    height = 200; // Höhe der Wolke
    speed = Math.random() * 0.3 + 0.1; // Zufällige Geschwindigkeit zwischen 1 und 3

    constructor(imagePath) {
        super().loadImage(imagePath);
        this.x = Math.random() *  500; // Zufällige Startposition rechts außerhalb des Fensters
    }

    move() {
        this.x -= this.speed; // X-Position nach links verschieben
        if (this.x + this.width < 0) { // Wenn die Wolke den linken Rand verlässt
            this.x = 800 + Math.random() * 500; // Zurücksetzen rechts außerhalb des Fensters
        }
    }
}
