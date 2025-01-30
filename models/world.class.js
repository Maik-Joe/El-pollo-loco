class World {
    
    level = level1;
    character = new Character();
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    endboss = new Endboss();
    coinBar = new CoinBar();
    throwableObjects = [];
    moveableObjects = [];
    GameOver = false;
    ctx;
    canvas;
    keyboard;
    camera_x = 0;
    gameRunning;

    /**
     * Creates a new game world, initializes the rendering context,
     * associates the character with status bars, starts the draw loop,
     * and begins the main game logic loop.
     * @param {HTMLCanvasElement} canvas - The canvas element for rendering.
     * @param {Keyboard} keyboard - The keyboard input handler.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;

        this.character.bottleBar = this.bottleBar;
        this.character.coinBar = this.coinBar;

        this.moveableObjects = [this.character, ...this.level.enemies];
        this.gameRunning = true;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Assigns a reference to the world inside the character object.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Runs the main game checks at regular intervals:
     * collisions, throwable objects, bottle and coin collection,
     * and game over conditions.
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottles();
            this.checkCoins();
            this.checkGameOver();
        }, 200);
    }

    /**
     * Continuously draws all elements on the canvas using requestAnimationFrame.
     * Handles background, HUD, characters, and other objects.
     */
    draw() {
        this.clearCanvas();
        this.ctx.translate(this.camera_x, 0);

        this.drawBackground();
        this.drawGameObjects();
        this.drawCharacter();

        this.ctx.translate(-this.camera_x, 0);
        this.drawHUD();

        this.scheduleNextFrame();
    }

    /**
     * Clears the entire canvas area.
     */
    clearCanvas() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    /**
     * Draws all background elements (background objects, clouds).
     */
    drawBackground() {
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
    }

    /**
     * Draws the HUD elements (health bar, bottle bar, coin bar, endboss bar).
     */
    drawHUD() {
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
    }

    /**
     * Draws the main game objects such as coins, throwable objects,
     * bottles, and enemies.
     */
    drawGameObjects() {
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
    }

    /**
     * Draws the character on the canvas.
     */
    drawCharacter() {
        this.addToMap(this.character);
    }

    /**
     * Requests the next animation frame to keep drawing.
     */
    scheduleNextFrame() {
        requestAnimationFrame(() => this.draw());
    }

    /**
     * Adds multiple objects to the draw loop.
     * @param {DrawableObject[]|MoveableObject[]} objects - The objects to be drawn.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Draws a single object, taking into account its orientation (flipping if needed).
     * @param {DrawableObject|MoveableObject} mo - The object to draw.
     */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }
        mo.draw(this.ctx);
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Checks if the player wants to throw a bottle (D key) and
     * if any bottles are still available. Creates a new throwable
     * bottle and updates the bottle bar.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleBar.percentage > 0) {
            let bottle = new ThrowableObject(
                this.character.x + 40,
                this.character.y + 60,
                this.bottleBar,
                this.character.otherDirection ? 'LEFT' : 'RIGHT'
            );
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(Math.max(0, this.bottleBar.percentage - 20));
        }
    }

    /**
     * Checks collisions between the character and enemies,
     * as well as between throwable objects and enemies.
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if (this.character.isColliding(enemy)) {
                this.handleCharacterEnemyCollision(enemy);
            }
            this.throwableObjects.forEach(bottle => {
                if (bottle.isCollidingWithThrowableObject(enemy)) {
                    this.handleThrowableCollisionWithEnemy(enemy, bottle);
                }
            });
        });
    }

    /**
     * Handles collisions between a throwable bottle and an enemy,
     * causing damage to the enemy (boss or regular).
     * @param {MoveableObject} enemy - The enemy that was hit.
     * @param {ThrowableObject} bottle - The colliding bottle object.
     */
    handleThrowableCollisionWithEnemy(enemy, bottle) {
        if (enemy instanceof Endboss) {
            enemy.takeHitBoss();
            this.endbossBar.setPercentage(enemy.energy);
        } else {
            enemy.takeDamage();
        }
        bottle.playSplashAnimation();
    }

    /**
     * Handles the character collision with a regular enemy (chicken or small chicken).
     * @param {MoveableObject} enemy - The enemy the character collided with.
     */
    handleCharacterEnemyCollision(enemy) {
        if ((enemy instanceof ChickenSmall || enemy instanceof Chicken) && !enemy.isDead()) {
            const isJumpingOnChicken = this.character.isCollidingJump(enemy);
            this.processCharacterCollision(isJumpingOnChicken, enemy);
        }
    }

    /**
     * Handles character collision logic:
     * If the character is jumping on a chicken, the chicken takes damage,
     * otherwise the character takes damage.
     * @param {boolean} isJumpingOnChicken - True if the character landed on the chicken.
     * @param {MoveableObject} enemy - The enemy in collision.
     */
    processCharacterCollision(isJumpingOnChicken, enemy) {
        if (isJumpingOnChicken) {
            enemy.takeDamage();
        } else {
            this.character.hit();
        }
    }

    /**
     * Checks if the character is colliding with a bottle. If so,
     * and the bottle bar is not full, the character picks up the bottle.
     */
    checkBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                if (this.character.bottleBar.percentage < 100) {
                    this.character.pickBottles();
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                }
            }
        });
    }

    /**
     * Checks if the character is colliding with a coin. If so,
     * the character picks up the coin and it is removed from the level.
     */
    checkCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.pickCoins();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
            }
        });
    }

    /**
     * Checks whether the game is over by seeing if the character or the endboss is dead.
     * If the game is over, the game over or win screen is shown,
     * and movement is stopped.
     */
    checkGameOver() {
        if (this.GameOver) return;
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);

        const handleEnd = (condition, image) => {
            if (condition) {
                this.GameOver = true;
                image();
                this.character.stopMovement();
                if (endboss) endboss.stopMovementEndboss();
            }
        };

        // Game over if character is dead
        handleEnd(this.character.isDead(), this.showGameOverImage.bind(this));
        // Game over if endboss is dead
        handleEnd(endboss && endboss.isDead(), this.showWinImage.bind(this));
    }

    /**
     * Displays the game over screen and hides the start screen.
     */
    showGameOverImage() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('gameOverScreen').style.display = 'block';
        document.getElementById('restartButton').style.display = 'block';
        document.getElementById('menuButton').style.display = 'block';
    }

    /**
     * Displays the win screen and hides the start screen.
     */
    showWinImage() {
        document.getElementById('startScreen').style.display = 'none';
        document.getElementById('winScreen').style.display = 'block';
        document.getElementById('restartButton').style.display = 'block';
        document.getElementById('menuButton').style.display = 'block';
    }

    /**
     * Flips the given object's image horizontally for mirrored display.
     * @param {MoveableObject} mo - The object to flip.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Restores the flipped object to its original orientation.
     * @param {MoveableObject} mo - The object to restore.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Hides the game over screen, the win screen, and their buttons.
     */
    hideStatusAndRestartButton() {
        document.getElementById('gameOverScreen').style.display = 'none';
        document.getElementById('winScreen').style.display = 'none';
        document.getElementById('restartButton').style.display = 'none';
        document.getElementById('menuButton').style.display = 'none';
    }

    /**
     * Resets the game world by resetting the character, level,
     * clearing throwable objects, and resetting the gameplay state.
     */
    resetWorld() {
        world.hideStatusAndRestartButton();
        this.character.reset();
        this.level.reset();
        this.throwableObjects = [];
        this.gameRunning = true;
    }

    /**
     * Toggles all game sounds on or off.
     * @param {boolean} enabled - True to enable sounds, false to disable.
     */
    toggleSounds(enabled) {
        AudioManager.toggleSounds(enabled);
    }
}
