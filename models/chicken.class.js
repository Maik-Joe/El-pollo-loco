/**
 * Repräsentiert ein Huhn, das sich auf dem Bildschirm bewegt.
 * @extends MoveableObject
 */
class Chicken extends MoveableObject {

    /**
     * Y-Position des Huhns
     * @type {number}
     */
    y = 350;

    /**
     * Breite des Huhns
     * @type {number}
     */
    width = 80;

    /**
     * Höhe des Huhns
     * @type {number}
     */
    height = 80;

    /**
     * Geschwindigkeit des Huhns
     * @type {number}
     */
    speed = 0;

    /**
     * Bildpfade für die Lauf-Animation
     * @type {string[]}
     */
    Images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    /**
     * Bildpfade für das tote Huhn
     * @type {string[]}
     */
    Images_Dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    /**
     * Objekt, das angibt, wie weit die Kollisionsgrenzen vom eigentlichen Bild abweichen
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: -5,
        left: 5,
        right: 5,
        bottom: 20,
    };

    /**
     * Erzeugt eine neue Instanz eines Huhns, legt eine zufällige x-Position und
     * Geschwindigkeit fest und lädt die benötigten Bilder.
     */
    constructor() {
        // Ruft den Konstruktor der Elternklasse auf und lädt ein Anfangsbild
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        // Legt eine zufällige x-Position und Geschwindigkeit fest
        this.x = 450 + Math.random() * 2000;
        this.speed = 0.5 + Math.random() * 3;

        // Lädt alle Bilder für die Lauf- und die Tote-Animation
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);

        // Startet die Animation des Huhns
        this.animate();
    }

    /**
     * Führt die linke Bewegung aus und startet in Intervallen
     * die Überprüfung, ob das Huhn tot ist oder noch läuft.
     */
    animate() {
        // Bewegt das Huhn initial nach links
        this.moveLeft();
        // Überprüft in regelmäßigen Abständen den Zustand des Huhns
        setInterval(() => {
            if (this.isDead()) {
                // Spielt die Animation für ein totes Huhn ab
                this.playAnimation(this.Images_Dead);
                // Entfernt das Huhn nach einer gewissen Zeit
                setTimeout(() => {
                    this.remove();
                }, 3000);
            } else {
                // Spielt die Lauf-Animation ab und bewegt das Huhn weiter nach links
                this.playAnimation(this.Images_Walking);
                this.moveLeft();
            }
        }, 60);
    }
}
