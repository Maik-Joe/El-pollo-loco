/**
 * Repräsentiert eine Wolke, die sich am Himmel bewegt.
 * @extends MoveableObject
 */
class Cloud extends MoveableObject {

    /**
     * Vertikale Position der Wolke
     * @type {number}
     */
    y = 20;

    /**
     * Breite der Wolke
     * @type {number}
     */
    width = 500;

    /**
     * Höhe der Wolke
     * @type {number}
     */
    height = 200;

    /**
     * Geschwindigkeit der Wolke
     * @type {number}
     */
    speed = Math.random() * 0.2 + 0.1;

    /**
     * Erstellt eine neue Wolke und lädt das entsprechende Bild.
     * 
     * @param {string} imagePath - Pfad zum Wolkenbild
     */
    constructor(imagePath) {
        // Lädt das Wolkenbild über die Elternklasse
        super().loadImage(imagePath);

        // Setzt eine zufällige X-Position (Startposition der Wolke)
        this.x = Math.random() * 3000;

        // Legt die Geschwindigkeit fest (leicht zufällig)
        this.speed = 0.1 + Math.random() * 0.2;

        // Startet die Bewegung der Wolke
        this.animate();
    }

    /**
     * Lässt die Wolke nach links bewegen.
     */
    animate() {
       setInterval(() => {
            this.moveLeft();
       }, 1000 / 60);
    }
}
