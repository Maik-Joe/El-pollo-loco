class World {
    character = new Character(); 
    
    enemies = Level1.enemies;
    clouds = Level1.clouds; 
    backgroundObjects = Level1.backgroundObjects;

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

        // Charakter, Gegner und Wolken zeichnen
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
            this.ctx.save();
            this.ctx.translate(mo.width, 0);
            this.ctx.scale(-1, 1);
            mo.x = mo.x * -1;
        }
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        if (mo.otherDirection) {
            mo.x = mo.x * -1;
            this.ctx.restore();
          
        }
    }
}
