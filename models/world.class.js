class World {

    level = Level1;
    character = new Character();
    statusBar = new StatusBar();
    bottleBar = new BottleBar();
    coinBar = new CoinBar();
    throwableObjects = [];
    

    ctx; // Canvas-Kontext
    canvas; // Canvas-Element
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.character.bottleBar = this.bottleBar;
        this.character.coinBar = this.coinBar;
        this.draw(); // Zeichen-Schleife starten
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
        }, 200);
    }

    checkThrowObjects() {
        if (this.keyboard.D && this.bottleBar.percentage > 0) {
            let bottle = new ThrowableObject(this.character.x + 60, this.character.y + 60, this.bottleBar);
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(Math.max(0, this.bottleBar.percentage - 20)); 
        }
    }
    
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            if  ( this.character.isColliding (enemy)) {
               this.character.hit();
               this.statusBar.setPercentage(this.character.energy);
               }
          });
        }

    checkBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                if (this.character.bottleBar.percentage < 100) { 
                    this.character.pickBottles(); // Aufsammeln der Flasche
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1); // Entfernen der Flasche
                } 
            }
        });
    }

    checkCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.pickCoins(); // Aufsammeln der Flasche
                this.level.coins.splice(this.level.coins.indexOf(coin), 1); // Entfernen der Flasche
            }
        });
    }
    
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // Hintergrund zuerst zeichnen
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
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

    // Fügt mehrere Objekte zur Karte hinzu
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    // Fügt ein einzelnes Objekt zur Karte hinzu
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
}
