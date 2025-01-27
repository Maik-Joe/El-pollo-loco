class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    sound_Walking = new Audio('audio/running-in-grass-6237_O3hpfyba.mp3')
    sound_Coins = new Audio('audio/coin-recieved-230517_424ntki3.mp3')
    sound_Bottle= new Audio('audio/bottle-pop-45531_wTjI9toB.mp3')
    sound_Chicken= new Audio('audio/chicken-noise-196746_J6JdS05m.mp3')
    sound_Hurt= new Audio('audio/young-man-being-hurt-95628_Y7RMBAUy.mp3')
    sound_Boss= new Audio('audio/chicken-noises-223056.mp3')
    sound_Win= new Audio('audio/short-success-sound-glockenspiel-treasure-video-game-6346.mp3')

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

    playSound(sound) {
        if (sound.readyState >= 2 && sound.paused) { 
            sound.currentTime = 0; 
            sound.play();
        }
    }

    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                this.y = 230;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    isAboveGround() {
        const groundLevel = 230;
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < groundLevel;
        }
    }

    isColliding(mo) {
        const isXColliding = this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        const isYColliding = this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        if (isXColliding && isYColliding && (mo instanceof ChickenSmall || mo instanceof Chicken || mo instanceof Endboss)) {
            this.processCollisionWithChicken(mo);  // Verarbeite die Kollision mit dem Gegner
        }
        return isXColliding && isYColliding;
    }

    processCollisionWithChicken(mo) {
        if (!mo.isDead() && !this.isInAir()) {
            if (mo instanceof Endboss) {
                this.getHitBoss();  // Der Endboss fügt dem Charakter 50 Schaden zu
            } else {
                this.hit();  // Normale Hühnchen fügen dem Charakter 10 Schaden zu
            }
        }
    }

    isCollidingWithThrowableObject(enemy) {
        const isXColliding = this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;
        const isYColliding = this.y + this.height - this.offset.bottom > enemy.y + enemy.offset.top &&
            this.y + this.offset.top < enemy.y + enemy.height - enemy.offset.bottom;

        if (isXColliding && isYColliding) {
            this.playSplashAnimation();
            return true;
        }
        return false;
    }

    isCollidingJump(mo) {
        const groundLevel = 230;
        const isYColliding =
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        if (isYColliding && !mo.isDead() && this.isInAir() && this.y < groundLevel) {
            mo.takeDamage();
            return true;
        }
        return false;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.playSound(this.sound_Hurt);
        this.sound_Hurt.volume = 0.07;
        this.world.statusBar.setPercentage(this.energy);
    }

    getHitBoss() {
        this.energy -= 40;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }

        this.world.statusBar.setPercentage(this.energy);
    }

    pickBottles() {
        this.bottleBar.percentage += 20;
        if (this.bottleBar.percentage > 100) {
            this.bottleBar.percentage = 100;
        }
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        this.playSound(this.sound_Bottle);
        this.sound_Bottle.volume = 0.1;
    }

    pickCoins() {
        this.coinBar.percentage += 20;
        if (this.coinBar.percentage > 100) {
            this.coinBar.percentage = 100;
        }
        this.coinBar.setPercentage(this.coinBar.percentage);
        this.playSound(this.sound_Coins);
        this.sound_Coins.volume = 0.1;
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }

    takeDamage(damage = 100) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die(); 
        }
    }

    takeHitBoss() {
        this.energy -= 6;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.playSound(this.sound_Boss);
        this.sound_Boss.volume = 0.5;
    }

    die() {
        this.isDeadFlag = true 
        this.playSound(this.sound_Chicken);
        this.sound_Chicken.volume = 0.2;
    }

    remove() {
        this.x = -1000;
        this.y = -1000;
        this.isDeadFlag = true;
    }

    isDead() {
        return this.energy == 0 || this.isDeadFlag;
    }

    moveRight() {
        this.x += this.speed;
    }

    moveLeft() {
        this.x -= this.speed;
    }

    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    jump() {
        this.speedY = 20;
    };

    isInAir() {
        const groundLevel = 230;
        return this.y < groundLevel;
    }
}
