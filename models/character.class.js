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

    sound_Walking = new Audio('audio/running-in-grass-6237_O3hpfyba.mp3');

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.Images_Walking);

        this.animate();
    }

    animate() {

        setInterval(() => {
           
            if (this.world.keyboard.RIGHT && this.x < 2250) {
                this.x += this.speed;
                this.sound_Walking.play();
                this.otherDirection = false;
            }

            if (this.world.keyboard.LEFT && this.x > -600) {
                this.x -= this.speed;
                  this.sound_Walking.play();
                this.otherDirection = true;
            }
            this.world.camera_x = -this.x + 100;
        }, 1000 / 60);

        setInterval(() => {

            if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.Images_Walking);
            }
        }, 50);
    };


    jump() {

    };
}