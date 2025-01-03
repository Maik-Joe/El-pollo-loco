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
    ];
    backgroundObjects = [
        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    ctx; // Canvas-Kontext
    canvas; // Canvas-Element

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.draw(); // Zeichen-Schleife starten
        this.update(); // Bewegungs-Logik starten
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

    update() {
        setInterval(() => {
            this.clouds.forEach(cloud => cloud.move());
        }, 1000 / 60); 
    }


    // Fügt mehrere Objekte zur Karte hinzu
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    // Fügt ein einzelnes Objekt zur Karte hinzu
    addToMap(no) {
        if (no.img) { // Überprüfen, ob das Bild geladen ist
            this.ctx.drawImage(no.img, no.x, no.y, no.width, no.height);
        }
    }
}
