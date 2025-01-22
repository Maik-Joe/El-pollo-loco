class MoveableObject extends DrawableObject {
    speed = 0.15;
    otherDirection = false;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;

    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    };

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
    }

    pickCoins() {
        this.coinBar.percentage += 20;
        if (this.coinBar.percentage > 100) {
            this.coinBar.percentage = 100;
        }
        this.coinBar.setPercentage(this.coinBar.percentage);
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
            this.die(); // Wenn die Energie 0 erreicht, stirbt der Gegner
        }
    }

    takeHitBoss() {
        this.energy -= 6;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    die() {
        this.isDeadFlag = true; // Gegner als tot markieren
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
