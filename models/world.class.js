class World {
    character = new Character();
    enemies = [
    new Chicken(),
    new Chicken(),
    new Chicken(),
];
    clouds = [
        new Cloud()
    ];
    backgroundObjects = [
        new BackgroundObject ('img/5_background/layers/air.png', 0),
        new BackgroundObject ('img/5_background/layers/3_third_layer/1.png',0),
        new BackgroundObject ('img/5_background/layers/2_second_layer/1.png',0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
    ];
    ctx;
    canvas;

    constructor(canvas) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas
        this.draw();
    }


    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
        // Zuerst den Hintergrund hinzufügen
        this.addObjectsToMap(this.backgroundObjects);
    
        // Dann die Objekte im Vordergrund hinzufügen
        this.addToMap(this.character);
        this.addObjectsToMap(this.enemies);
        this.addObjectsToMap(this.clouds);
    
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


    addToMap(no) {
        this.ctx.drawImage (no.img, no.x, no.y, no.width, no.height);
    }
}