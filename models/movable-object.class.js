/**
 * Eine Klasse, die ein bewegliches Objekt darstellt, das von DrawableObject erbt
 */
class MoveableObject extends DrawableObject {

    // Attribute
    speed = 0.15; // Geschwindigkeit des Objekts
    otherDirection = false; // Objektrichtung
    isSoundEnabled = true; // Sound ist aktiviert oder nicht
    speedY = 0; // Vertikale Geschwindigkeit
    acceleration = 2; // Beschleunigung
    energy = 100; // Energie des Objekts
    lastHit = 0; // Zeitpunkt des letzten Treffers
    offset = { // Versatz für Kollisionsberechnungen
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Schwerkraft anwenden
     * Objekte fallen lassen, wenn sie in der Luft sind
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            } else {
                // Objekt erreicht den Boden
                this.y = 230;
                this.speedY = 0;
            }
        }, 1000 / 25);
    }

    /**
     * Überprüfen, ob das Objekt über dem Boden ist
     * @returns {boolean}
     */
    isAboveGround() {
        const groundLevel = 230;
        if (this instanceof ThrowableObject) {
            return true;
        } else {
            return this.y < groundLevel;
        }
    }

    /**
     * Überprüfen, ob das Objekt mit einem anderen Objekt kollidiert
     * @param {Object} mo - Ein anderes bewegliches Objekt
     * @returns {boolean}
     */
    isColliding(mo) {
        const isXColliding = 
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;
        
        const isYColliding = 
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        if (isXColliding && isYColliding && 
            (mo instanceof ChickenSmall || mo instanceof Chicken || mo instanceof Endboss)) {
            this.processCollisionWithChicken(mo);
        }
        return isXColliding && isYColliding;
    }

    /**
     * Verarbeiten der Kollision mit einem Huhn
     * @param {Object} mo - Ein Huhn-Objekt
     */
    processCollisionWithChicken(mo) {
        if (!mo.isDead() && !this.isInAir()) {
            if (mo instanceof Endboss) {
                this.getHitBoss();
            } else {
                this.hit();
            }
        }
    }

    /**
     * Überprüfen, ob das Objekt mit einem werfbaren Objekt kollidiert
     * @param {Object} enemy - Ein feindliches Objekt
     * @returns {boolean}
     */
    isCollidingWithThrowableObject(enemy) {
        const isXColliding = 
            this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;
        
        const isYColliding = 
            this.y + this.height - this.offset.bottom > enemy.y + enemy.offset.top &&
            this.y + this.offset.top < enemy.y + enemy.height - enemy.offset.bottom;

        if (isXColliding && isYColliding) {
            this.playSplashAnimation(); // Falls du einen Splash-Effekt hast
            return true;
        }
        return false;
    }

    /**
     * Überprüfen, ob das Objekt beim Sprung kollidiert
     * @param {Object} mo - Ein bewegliches Objekt
     * @returns {boolean}
     */
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

    /**
     * Das Objekt erleidet einen Treffer
     */
    hit() {
        if (this.isDead()) return;
        this.energy -= 5;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        AudioManager.play('hurt', 0.07);
        this.world.statusBar.setPercentage(this.energy);
    }

    /**
     * Das Objekt erleidet einen Treffer vom Boss
     */
    getHitBoss() {
        this.energy -= 50;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.world.statusBar.setPercentage(this.energy);
    }

    /**
     * Flaschen aufsammeln
     */
    pickBottles() {
        this.bottleBar.percentage += 20;
        if (this.bottleBar.percentage > 100) {
            this.bottleBar.percentage = 100;
        }
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        // Sound abspielen
        AudioManager.play('bottle', 0.1);
    }

    /**
     * Münzen aufsammeln
     */
    pickCoins() {
        this.coinBar.percentage += 20;
        if (this.coinBar.percentage > 100) {
            this.coinBar.percentage = 100;
        }
        this.coinBar.setPercentage(this.coinBar.percentage);
        // Sound abspielen
        AudioManager.play('coins', 0.1);
    }

    /**
     * Überprüfen, ob das Objekt verletzt ist
     * @returns {boolean}
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit; 
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }

    /**
     * Das Objekt nimmt Schaden
     * @param {number} damage - Die Schadenshöhe
     */
    takeDamage(damage = 100) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    /**
     * Der Boss nimmt Schaden
     */
    takeHitBoss() {
        this.energy -= 6;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        // Endboss-Sound
        AudioManager.play('boss', 0.5);
    }

    /**
     * Das Objekt stirbt
     */
    die() {
        this.isDeadFlag = true;
        AudioManager.play('chicken', 0.2);
    }

    /**
     * Das Objekt entfernen
     */
    remove() {
        this.x = -1000;
        this.y = -1000;
        this.isDeadFlag = true;
    }

    /**
     * Überprüfen, ob das Objekt tot ist
     * @returns {boolean}
     */
    isDead() {
        return this.energy == 0 || this.isDeadFlag;
    }

    /**
     * Das Objekt bewegt sich nach rechts
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Das Objekt bewegt sich nach links
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Animation abspielen
     * @param {Array} images - Array von Bildpfaden
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Das Objekt springt
     */
    jump() {
        this.speedY = 20;
    }

    /**
     * Überprüfen, ob das Objekt in der Luft ist
     * @returns {boolean}
     */
    isInAir() {
        const groundLevel = 230;
        return this.y < groundLevel;
    }
}