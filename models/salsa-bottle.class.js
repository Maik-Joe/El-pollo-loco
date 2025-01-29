/************************************************************
 * Repräsentiert eine Salsa-Flasche im Spiel, die eingesammelt 
 * werden kann und über eine kleine Animation verfügt.
 * @extends MoveableObject
 ************************************************************/
class SalsaBottle extends MoveableObject {

    /**
     * Breite der Salsa-Flasche.
     * @type {number}
     */
    width = 60;

    /**
     * Höhe der Salsa-Flasche.
     * @type {number}
     */
    height = 60; 

    /**
     * Bildpfade für die Animation (z.B. zwei Versionen der Salsa-Flasche).
     * @type {string[]}
     */
    Images_Walking = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];

    /**
     * Objekt, das die Kollisionsgrenzen im Vergleich zur tatsächlichen Bildgröße anpasst.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 20,
        left: 40,
        right: 30,
        bottom: 0
    };

    /**
     * Erzeugt eine neue Salsa-Flasche an einer zufälligen X- und Y-Position 
     * und lädt die benötigten Bilder.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');

        // Zufällige Position für die Salsa-Flasche
        this.x = 150 + Math.random() * 2000;
        this.y = 360 + Math.random() * 15;

        // Lädt die Animationsbilder
        this.loadImages(this.Images_Walking);

        // Startet die Animation
        this.animate();
    }

    /**
     * Wechselt in festgelegten Abständen zwischen den Salsa-Flaschen-Bildern.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.Images_Walking);
        }, 200);
    }
}
