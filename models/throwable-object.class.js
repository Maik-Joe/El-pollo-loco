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

    bottleBar; // Referenz zur BottleBar-Instanz

    constructor(x, y, bottleBar) {
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
        this.bottleBar = bottleBar; // Speichere die BottleBar-Referenz nur, wenn sie übergeben wird
        this.throw();
        this.animate();
    }

    throw() {
        this.applyGravity();
    
        const movementInterval = setInterval(() => {
            if (!this.isOnGround) {
                this.x += 15;
            }
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
                clearInterval(splashInterval); 
                this.loadImage(this.Images_Splash[this.Images_Splash.length - 1]); 
            }
        }, 50); 
    }

    reduceBottleBarPercentage() {
        // Überprüfen, ob bottleBar existiert, bevor auf die percentage zugegriffen wird
        if (this.bottleBar) {
            let newPercentage = this.bottleBar.percentage - 20; // Reduziere um 20%
            if (newPercentage < 0) newPercentage = 0; // Stelle sicher, dass der Wert nicht unter 0 geht
            this.bottleBar.setPercentage(newPercentage); // Aktualisiere den BottleBar-Status
        } else {
            console.error("BottleBar is undefined. Cannot reduce percentage.");
        }
    }
}
