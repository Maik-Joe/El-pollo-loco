class MoveableObject extends DrawableObject{
   

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
            }
        }, 1000 / 25);
    };

    isAboveGround() {
        if ( this instanceof ThrowableObject) {
            return true;   
        } else 
        return this.y < 230
    }

    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    hit() {
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0
        } else {
            this.lastHit = new Date().getTime();
        }
    }

    pickBottles() {
        // Nur das Energielevel der BottleBar erhöhen
        this.bottleBar.percentage += 20;
        
        // Stelle sicher, dass der Wert der BottleBar nicht über 100 steigt
        if (this.bottleBar.percentage > 100) {
            this.bottleBar.percentage = 100;
        }
    
        // Setze die BottleBar auf den neuen Prozentsatz
        this.bottleBar.setPercentage(this.bottleBar.percentage);
    }
    
    pickCoins() {
        // Nur das Energielevel der BottleBar erhöhen
        this.coinBar.percentage += 20;
        
        // Stelle sicher, dass der Wert der BottleBar nicht über 100 steigt
        if (this.coinBar.percentage > 100) {
            this.coinBar.percentage = 100;
        }
    
        // Setze die BottleBar auf den neuen Prozentsatz
        this.coinBar.setPercentage(this.coinBar.percentage);
    }

    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }

    isDead() {
        return this.energy == 0;
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
}