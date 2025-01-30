class ThrowableObject extends MoveableObject {
    
    Images_BottleThrow = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png'
    ];
    Images_Splash = [
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png',
        'img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png'
    ];
    otherDirection = false;

    /**
     * Creates a new throwable bottle at the given coordinates, sets the flight direction,
     * loads the required images, and starts the throw.
     * @param {number} x - The X coordinate where the bottle is created.
     * @param {number} y - The Y coordinate where the bottle is created.
     * @param {Object} bottleBar - A reference to the BottleBar (for updating percentage).
     * @param {string} [characterDirection='right'] - The direction in which the bottle is thrown ('LEFT' or 'right').
     */
    constructor(x, y, bottleBar, characterDirection = 'right') {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.Images_BottleThrow);
        this.loadImages(this.Images_Splash);

        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;

        this.groundLevel = 450;
        this.isOnGround = false;
        this.bottleBar = bottleBar;
        this.otherDirection = (characterDirection === 'LEFT');
        this.speedY = 20;

        this.throw();
        this.animate();
    }

    /**
     * Initiates the bottle throw by applying gravity
     * and moving the bottle in set intervals until it hits the ground.
     */
    throw() {
        this.applyGravity();
        const movementInterval = setInterval(() => {
            this.x += this.otherDirection ? -15 : 15;
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
     * Animates the bottle rotation while it is in the air,
     * switching between different rotation images.
     */
    animate() {
        setInterval(() => {
            if (!this.isOnGround) {
                this.playAnimation(this.Images_BottleThrow);
            }
        }, 60);
    }

    /**
     * Plays the splash animation after the bottle has hit the ground,
     * and retains the final splash frame once the animation is complete.
     */
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

    /**
     * Reduces the bottle bar percentage by 20, ensuring it does not drop below 0.
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
