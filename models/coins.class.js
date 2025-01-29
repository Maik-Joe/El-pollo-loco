/*****************************************************
 * Repräsentiert eine Münze im Spiel, die eingesammelt 
 * werden kann und über eine kleine Animation verfügt.
 * @extends MoveableObject
 *****************************************************/
class Coins extends MoveableObject {

    /**
     * Breite der Münze
     * @type {number}
     */
    width = 80;

    /**
     * Höhe der Münze
     * @type {number}
     */
    height = 80; 

    /**
     * Bildpfade für die Animationsphasen der Münze.
     * @type {string[]}
     */
    Images_Walking = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    
    /**
     * Objekt, das die Kollisionsgrenzen der Münze vom tatsächlichen Bild abweichen lässt.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 0,
        left: 40,
        right: 40,
        bottom: 80
    };

    /**
     * Erzeugt eine neue Münze an einer zufälligen X- und Y-Position.
     * Lädt die benötigten Bilder und startet die Animations-Schleife.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');

        // Zufällige Position für die Münze
        this.x = 150 + Math.random() * 2000;
        this.y = 220 + Math.random() * 35;

        // Lädt alle Animationsbilder
        this.loadImages(this.Images_Walking);

        // Startet die Animation
        this.animate();
    }
    
    /**
     * Spielt die Münz-Animation in einem wiederkehrenden Intervall ab.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.Images_Walking);
        }, 300); 
    }
}
