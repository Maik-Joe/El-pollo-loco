/************************************************************
 * Repräsentiert ein werfbares Objekt (z.B. eine Salsa-Flasche),
 * das sich im Bogen bewegt, auf dem Boden aufschlägt und 
 * eine Splash-Animation abspielt.
 * @extends MoveableObject
 ************************************************************/
class ThrowableObject extends MoveableObject {

    /**
     * Bildpfade für die Flaschen-Rotations-Animation während des Wurfs.
     * @type {string[]}
     */
    Images_BottleThrow = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];

    /**
     * Bildpfade für die Splash-Animation nach dem Aufprall.
     * @type {string[]}
     */
    Images_Splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];

    /**
     * Referenz auf die BottleBar, um deren Prozentsatz zu reduzieren.
     * @type {CoinBar|Object|undefined} 
     * (Der genaue Typ hängt von der konkreten Implementierung ab.)
     */
    bottleBar;

    /**
     * Gibt an, ob das Objekt in die entgegengesetzte Richtung geworfen wird
     * (z.B. nach links statt nach rechts).
     * @type {boolean}
     */
    otherDirection = false;

    /**
     * Erzeugt eine neue werfbare Flasche an den übergebenen Koordinaten,
     * legt die Richtung fest, lädt die benötigten Bilder und startet den Wurf.
     * 
     * @param {number} x - Die X-Position, an der die Flasche erscheint.
     * @param {number} y - Die Y-Position, an der die Flasche erscheint.
     * @param {Object} bottleBar - Eine Referenz auf die BottleBar (zur Aktualisierung).
     * @param {string} [characterDirection='right'] - Richtung, in die geworfen wird ('LEFT' oder 'right').
     */
    constructor(x, y, bottleBar, characterDirection = 'right') {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.Images_BottleThrow);
        this.loadImages(this.Images_Splash);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;

        /**
         * Y-Wert, an dem die Flasche den Boden berührt.
         * @type {number}
         */
        this.groundLevel = 450;

        /**
         * Speichert, ob die Flasche den Boden bereits berührt hat.
         * @type {boolean}
         */
        this.isOnGround = false;

        this.bottleBar = bottleBar;

        // Wenn der Charakter nach links schaut, soll die Flasche auch nach links fliegen.
        this.otherDirection = (characterDirection === 'LEFT');

        this.speedY = 20;  // Initiale Aufwärtsgeschwindigkeit
        this.throw();      // Startet den Wurf
        this.animate();    // Startet die Animationsschleife
    }

    /**
     * Führt den Wurf der Flasche aus:
     * - Wendet Gravitation an
     * - Bewegt die Flasche in einem festen Intervall
     * - Prüft Kollision mit dem Boden (groundLevel)
     */
    throw() {
        this.applyGravity();

        const movementInterval = setInterval(() => {
            // Bewegung nach links oder rechts
            this.x += this.otherDirection ? -15 : 15;

            // Sobald die Flasche auf dem Boden aufkommt
            if (this.y + this.height >= this.groundLevel) {
                this.y = this.groundLevel - this.height;
                this.speedY = 0;
                this.isOnGround = true;
                clearInterval(movementInterval);
                this.playSplashAnimation(); 
            }
        }, 50);
    }

    /**
     * Animiert die Flasche, solange sie sich nicht auf dem Boden befindet,
     * indem sie zwischen den Rotations-Bildern wechselt.
     */
    animate() {
        setInterval(() => {
            if (!this.isOnGround) {
                this.playAnimation(this.Images_BottleThrow);
            }
        }, 60);
    }

    /**
     * Spielt die Splash-Animation ab, nachdem die Flasche den Boden berührt hat.
     * Wenn die Animation endet, wird kein weiteres Bild mehr gewechselt.
     */
    playSplashAnimation() {
        let splashIndex = 0;
        const splashInterval = setInterval(() => {
            if (splashIndex < this.Images_Splash.length) {
                this.loadImage(this.Images_Splash[splashIndex]);
                splashIndex++;
            } else {
                clearInterval(splashInterval);
                // Letztes Splash-Bild beibehalten
                this.loadImage(this.Images_Splash[this.Images_Splash.length - 1]);
            }
        }, 50);
    }

    /**
     * Reduziert den Prozentsatz in der BottleBar (z.B. nachdem eine Flasche 
     * geworfen wurde), jedoch nicht unter 0.
     */
    reduceBottleBarPercentage() {
        if (this.bottleBar) {
            let newPercentage = this.bottleBar.percentage - 20;
            if (newPercentage < 0) {
                newPercentage = 0;
            }
            this.bottleBar.setPercentage(newPercentage);
        }
    }
}
