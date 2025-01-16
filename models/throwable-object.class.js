class ThrowableObject extends MoveableObject {
    Images_BottleThrow = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ];

    Images_Splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png',
    ];

    constructor(x, y) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.Images_BottleThrow);
        this.loadImages(this.Images_Splash);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.speedY = 20;
        this.groundLevel = 450; // Definiere die Bodenhöhe
        this.isOnGround = false; // Status: Hat die Flasche den Boden erreicht?
        this.throw();
        this.animate();
    }

    throw() {
        this.applyGravity();

        const movementInterval = setInterval(() => {
            if (!this.isOnGround) {
                // Bewege die Flasche horizontal weiter, solange sie nicht auf dem Boden ist
                this.x += 15;
            }

            // Überprüfe, ob die Flasche den Boden erreicht hat
            if (this.y + this.height >= this.groundLevel) {
                this.y = this.groundLevel - this.height; // Setze die Flasche auf den Boden
                this.speedY = 0; // Stoppe die vertikale Bewegung
                this.isOnGround = true; // Markiere die Flasche als "auf dem Boden"
                clearInterval(movementInterval); // Beende die horizontale Bewegung
                this.playSplashAnimation(); // Starte die Splash-Animation
            }
        }, 50);
    }

    animate() {
        setInterval(() => {
            // Spiele die Animation nur, solange die Flasche nicht auf dem Boden ist
            if (!this.isOnGround) {
                this.playAnimation(this.Images_BottleThrow);
            }
        }, 60);
    }

    playSplashAnimation() {
        let splashIndex = 0;
        const splashInterval = setInterval(() => {
            if (splashIndex < this.Images_Splash.length) {
                this.loadImage(this.Images_Splash[splashIndex]);
                splashIndex++;
            } else {
                clearInterval(splashInterval); // Stoppe die Animation, wenn alle Bilder abgespielt wurden
                this.loadImage(this.Images_Splash[this.Images_Splash.length - 1]); // Letztes Bild anzeigen
            }
        }, 50); // Längeres Intervall zwischen den Bildern
    }
}
