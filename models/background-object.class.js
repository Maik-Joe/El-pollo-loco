/**
 * Repräsentiert ein Hintergrundobjekt im Spiel.
 * Erweitert die Klasse MoveableObject.
 */
class BackgroundObject extends MoveableObject {

    /**
     * Breite des Hintergrundobjekts
     * @type {number}
     */
    width = 720;

    /**
     * Höhe des Hintergrundobjekts
     * @type {number}
     */
    height = 480;

    /**
     * Erstellt ein neues Hintergrundobjekt.
     * @param {string} imagePath - Der Pfad zum Bild des Hintergrundobjekts.
     * @param {number} x - Die X-Koordinate des Hintergrundobjekts.
     */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x;
        this.y = 480 - this.height;
    }
}