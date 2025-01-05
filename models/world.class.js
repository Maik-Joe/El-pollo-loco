class World {
    character = new Character(); // Hauptcharakter
    enemies = [
        new Chicken(),
        new Chicken(),
        new Chicken(), // Gegner hinzufügen
    ];
    clouds = [
        new Cloud('img/5_background/layers/4_clouds/1.png'),
        new Cloud('img/5_background/layers/4_clouds/2.png'),
    ]; f
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    ctx; // Canvas-Kontext
    canvas; // Canvas-Element
    keyboard;

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

        // Hintergrund zuerst zeichnen
        this.addObjectsToMap(this.backgroundObjects);

        // Charakter, Gegner und Wolken zeichnen
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);

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
