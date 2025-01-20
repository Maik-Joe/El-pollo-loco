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

    bottleBar; 
    otherDirection = false; 
    splashRadius = 10;

    constructor(x, y, bottleBar, characterDirection = 'right') {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.Images_BottleThrow);
        this.loadImages(this.Images_Splash);
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.speedY = 20;
        this.groundLevel = 450; 
        this.isOnGround = false; 
        this.bottleBar = bottleBar; 

      
        this.otherDirection = characterDirection === 'LEFT';

        this.throw();
        this.animate();
    }

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
                this.checkDamageInRadius(); 
            }
        }, 50); 
    }

    checkDamageInRadius() {
        this.level.enemies.forEach(enemy => {
            const distance = Math.sqrt(Math.pow(this.x - enemy.x, 2) + Math.pow(this.y - enemy.y, 2)); 
            if (distance <= this.splashRadius) { 
                enemy.takeDamage(); 
            }
        });
    }

    reduceBottleBarPercentage() {
        if (this.bottleBar) {
            let newPercentage = this.bottleBar.percentage - 20; 
            if (newPercentage < 0) newPercentage = 0;
            this.bottleBar.setPercentage(newPercentage);
        } 
    }
}
