class MoveableObject extends DrawableObject {

    speed = 0.15;
    otherDirection = false;
    isSoundEnabled = true;
    speedY = 0;
    acceleration = 2;
    energy = 100;
    lastHit = 0;
    
    offset = {
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
    };

    /**
     * Applies gravity to the object, making it fall if it is above the ground.
     */
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

    /**
     * Checks if the object is above the ground.
     * @returns {boolean} True if above the ground, otherwise false.
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
     * Checks if this object is colliding with another moveable object.
     * @param {Object} mo - The other moveable object.
     * @returns {boolean} True if colliding, otherwise false.
     */
    isColliding(mo) {
        const isXColliding =
            this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right;

        const isYColliding =
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        if (
            isXColliding &&
            isYColliding &&
            (mo instanceof ChickenSmall || mo instanceof Chicken || mo instanceof Endboss)
        ) {
            this.processCollisionWithChicken(mo);
        }

        return isXColliding && isYColliding;
    }

    /**
     * Processes collision with a chicken (or chicken-like enemy).
     * @param {Object} mo - A chicken object.
     */
    processCollisionWithChicken(mo) {
        if (!mo.isDead()) {
            if (this.isCollidingJump(mo)) {
                mo.takeDamage();
            } else {
                if (mo instanceof Endboss) {
                    this.getHitBoss();
                } else {
                    this.hit();
                }
            }
        }
    }

    /**
     * Checks if this object is colliding with a throwable object.
     * @param {Object} enemy - The throwable object (enemy).
     * @returns {boolean} True if colliding, otherwise false.
     */
    isCollidingWithThrowableObject(enemy) {
        const isXColliding =
            this.x + this.width - this.offset.right > enemy.x + enemy.offset.left &&
            this.x + this.offset.left < enemy.x + enemy.width - enemy.offset.right;

        const isYColliding =
            this.y + this.height - this.offset.bottom > enemy.y + enemy.offset.top &&
            this.y + this.offset.top < enemy.y + enemy.height - enemy.offset.bottom;

        if (isXColliding && isYColliding) {
            this.playSplashAnimation?.(); // Call splash animation if it exists
            return true;
        }
        return false;
    }

    /**
     * Checks collision specifically when jumping on an object.
     * @param {Object} mo - A moveable object.
     * @returns {boolean} True if colliding during a jump, otherwise false.
     */
    isCollidingJump(mo) {
        const groundLevel = 230;
        const isYColliding =
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;

        // Must be falling down (speedY < 0) and above ground
        if (isYColliding && !mo.isDead() && this.speedY < 0 && this.y < groundLevel) {
            mo.takeDamage();
            return true;
        }
        return false;
    }

    /**
     * Causes this object to take a hit, reducing energy.
     * Plays a hurt sound and updates the status bar.
     */
    hit() {
        if (this.isDead()) return;
        this.energy -= 3;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        AudioManager.play('hurt', 0.07);
        this.world.statusBar.setPercentage(this.energy);
    }

    /**
     * Causes this object to take a boss-level hit.
     */
    getHitBoss() {
        this.energy -= 100;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        this.world.statusBar.setPercentage(this.energy);
    }

    /**
     * Picks up bottles, increasing the bottle bar percentage and playing a sound.
     */
    pickBottles() {
        this.bottleBar.percentage += 20;
        if (this.bottleBar.percentage > 100) {
            this.bottleBar.percentage = 100;
        }
        this.bottleBar.setPercentage(this.bottleBar.percentage);
        AudioManager.play('bottle', 0.1);
    }

    /**
     * Picks up coins, increasing the coin bar percentage and playing a sound.
     */
    pickCoins() {
        this.coinBar.percentage += 20;
        if (this.coinBar.percentage > 100) {
            this.coinBar.percentage = 100;
        }
        this.coinBar.setPercentage(this.coinBar.percentage);
        AudioManager.play('coins', 0.1);
    }

    /**
     * Checks if this object is currently in a hurt state.
     * @returns {boolean} True if hurt, otherwise false.
     */
    isHurt() {
        let timepassed = new Date().getTime() - this.lastHit;
        timepassed = timepassed / 1000;
        return timepassed < 0.8;
    }

    /**
     * Deals damage to this object, potentially killing it.
     * @param {number} [damage=100] - The amount of damage inflicted.
     */
    takeDamage(damage = 100) {
        this.energy -= damage;
        if (this.energy <= 0) {
            this.energy = 0;
            this.die();
        }
    }

    /**
     * Causes the boss to take a smaller amount of damage.
     */
    takeHitBoss() {
        this.energy -= 4;
        if (this.energy < 0) {
            this.energy = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
        AudioManager.play('boss', 0.5);
    }

    /**
     * Kills this object and plays the appropriate sound.
     */
    die() {
        this.isDeadFlag = true;
        AudioManager.play('chicken', 0.2);
    }

    /**
     * Removes this object from the field by moving it off-screen and marking it as dead.
     */
    remove() {
        this.x = -1000;
        this.y = -1000;
        this.isDeadFlag = true;
    }

    /**
     * Checks if this object is dead.
     * @returns {boolean} True if dead, otherwise false.
     */
    isDead() {
        return this.energy === 0 || this.isDeadFlag;
    }

    /**
     * Moves the object to the right.
     */
    moveRight() {
        this.x += this.speed;
    }

    /**
     * Moves the object to the left.
     */
    moveLeft() {
        this.x -= this.speed;
    }

    /**
     * Plays an animation sequence from a given array of image paths.
     * @param {string[]} images - Array of image paths.
     */
    playAnimation(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
     * Makes the object jump by assigning an upward speed.
     */
    jump() {
        this.speedY = 20;
    }
}
