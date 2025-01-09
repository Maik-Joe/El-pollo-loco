class World {

    clouds = Level1.clouds;
    backgroundObjects = Level1.backgroundObjects;
    character = new Character();
    bottles = Level1.bottles;
    enemies = Level1.enemies;
    coins = Level1.coins;


    ctx; // Canvas-Kontext
    canvas; // Canvas-Element
    keyboard;
    camera_x = 0;

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw(); // Zeichen-Schleife starten
        this.setWorld();
    }

    setWorld() {
        this.character.world = this;
    }

    // Zeichnet die Welt
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.translate(this.camera_x, 0);

        // Hintergrund zuerst zeichnen
        this.addObjectsToMap(this.backgroundObjects);
        this.addObjectsToMap(this.coins);
        this.addObjectsToMap(this.bottles);
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

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
