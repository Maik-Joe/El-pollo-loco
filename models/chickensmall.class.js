/**
 * Repräsentiert ein kleines Huhn, das sich auf dem Bildschirm bewegt.
 * @extends MoveableObject
 */
class ChickenSmall extends MoveableObject {

    /**
     * Y-Position des kleinen Huhns
     * @type {number}
     */
    y = 380;

    /**
     * Breite des kleinen Huhns
     * @type {number}
     */
    width = 40;

    /**
     * Höhe des kleinen Huhns
     * @type {number}
     */
    height = 40;

    /**
     * Geschwindigkeit des kleinen Huhns
     * @type {number}
     */
    speed = 0;

    /**
     * Bildpfade für die Lauf-Animation des kleinen Huhns
     * @type {string[]}
     */
    Images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    /**
     * Bildpfade für das tote kleine Huhn
     * @type {string[]}
     */
    Images_Dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    /**
     * Objekt, das die Kollisionsgrenzen vom eigentlichen Bild abweichen lässt
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: -25,
        left: 10,
        right: 10,
        bottom: 10,
    };

    /**
     * Erzeugt eine neue Instanz eines kleinen Huhns und lädt alle erforderlichen Ressourcen.
     * Ruft den Konstruktor der Elternklasse auf und setzt eine zufällige x-Position 
     * sowie die Geschwindigkeit.
     */
    constructor() {
        // Ruft die Methode loadImage() der Elternklasse über 'super' auf
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');

        // Legt eine zufällige x-Position und Geschwindigkeit fest
        this.x = 250 + Math.random() * 2000;
        this.speed = 0.4 + Math.random() * 0.25;

        // Lädt alle Bilder für Lauf- und Todes-Animation
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);

        // Startet die Animation
        this.animate();
    }

    /**
     * Bewegt das Huhn nach links und überprüft in Intervallen,
     * ob das Huhn tot ist oder noch lebt.
     */
    animate() {
        // Bewegt das Huhn initial nach links
        this.moveLeft();
        // Überwacht den Zustand des Huhns in regelmäßigen Abständen
        setInterval(() => {
            if (this.isDead()) {
                // Spielt die Animation für ein totes Huhn ab
                this.playAnimation(this.Images_Dead);

                // Entfernt das Huhn nach 3 Sekunden
                setTimeout(() => {
                    this.remove();
                }, 3000); 
            } else {
                // Spielt die Lauf-Animation ab und bewegt das Huhn weiter nach links
                this.playAnimation(this.Images_Walking);
                this.moveLeft();
            }
        }, 1000 / 80);
    }
}
