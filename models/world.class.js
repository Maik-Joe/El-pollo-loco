class World {
    level = level1;
    character = new Character();
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    endbossBar = new EndbossBar();
    endboss = new Endboss();
    coinBar = new CoinBar();
    throwableObjects = [];
    GameOver = false;

    ctx;
    canvas;
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.bottleBar = this.bottleBar;
        this.character.coinBar = this.coinBar;
        this.gameRunning = true;
        this.draw();
        this.setWorld();
        this.run();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottles();
            this.checkCoins();
            this.checkGameOver();  // Überprüfung, ob der Charakter tot ist
        }, 200);
    }

    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);
        this.addToMap(this.character);
        this.ctx.translate(-this.camera_x, 0);
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);
        mo.drawFrame(this.ctx);

        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleBar.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 40, this.character.y + 60, this.bottleBar, this.character.otherDirection ? 'LEFT' : 'RIGHT');
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(Math.max(0, this.bottleBar.percentage - 20)); 
        }
    }

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
    
    handleThrowableCollisionWithEnemy(enemy, bottle) {
        if (enemy instanceof Endboss) {
            enemy.takeHitBoss();
            this.endbossBar.setPercentage(enemy.energy);
        } else {
            enemy.takeDamage();
        }
        bottle.playSplashAnimation();
    }
    
    handleCharacterEnemyCollision(enemy) {
        if ((enemy instanceof ChickenSmall || enemy instanceof Chicken) && !enemy.isDead()) {
            const isJumpingOnChicken = this.character.isCollidingJump(enemy);
            this.processCharacterCollision(isJumpingOnChicken, enemy);
        }
    }
    
    processCharacterCollision(isJumpingOnChicken, enemy) {
        if (isJumpingOnChicken) {
            enemy.takeDamage();
        } else {
            this.character.hit();
        }
    }
    
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

    checkCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.pickCoins(); 
                this.level.coins.splice(this.level.coins.indexOf(coin), 1); 
            }
        });
    }

    checkGameOver() {
        if (this.GameOver) return;
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        const checkCondition = (condition, image) => condition && (
            this.GameOver = true,
            image(),
            this.character.stopMovement(),
            endboss?.stopMovementEndboss(),
            this.level.enemies.forEach(enemy => enemy.stopMovement?.())
        );
        checkCondition(this.character.isDead(), this.showGameOverImage.bind(this));
        checkCondition(endboss?.isDead(), this.showWinImage.bind(this));
    }
    
    showGameOverImage() {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("menuButton").style.display = "block";
    }

    showWinImage() {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("winScreen").style.display = "block";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("menuButton").style.display = "block";
    }

    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    hideStatusAndRestartButton() {
        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("winScreen").style.display = "none";
        document.getElementById("restartButton").style.display = "none";
        document.getElementById("menuButton").style.display = "none";
    }
    
    resetWorld() {
        world.hideStatusAndRestartButton(); 
        this.character.reset();
        this.level.reset();
        this.throwableObjects = [];
        this.gameRunning = true;
    }
}
