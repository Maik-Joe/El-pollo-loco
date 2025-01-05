class Character extends MoveableObject {

    Images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    world;
    speed = 5;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_Walking);

        this.animate();
    }

    animate() {

        setInterval(() => {
            if (this.world.keyboard.RIGHT) {
                this.x += this.speed;
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT) {
                this.x -= this.speed;
                this.otherDirection =true;
            }
        }, 1000 / 60);

    setInterval(() => {

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            let i = this.currentImage % this.Images_Walking.length;
            let path = this.Images_Walking[i];
            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }, 50);
    };


jump() {

};
}