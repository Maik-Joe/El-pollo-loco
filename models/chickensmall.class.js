class ChickenSmall extends MoveableObject {

    y = 380;
    width = 40;
    height = 40;
    speed = 0;

    Images_Walking = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png'
    ];

    Images_Dead = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ];

    offset = {
        top: -30,
        left: 20,
        right: 20,
        bottom: 10,
    };

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.x = 250 + Math.random() * 2000;
        this.speed = 0.4 + Math.random() * 0.25;
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.animate();
    }

    animate() {
        this.moveLeft();
        setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.Images_Dead);
                setTimeout(() => {
                    this.remove();
                }, 3000); 
            } else {
                this.playAnimation(this.Images_Walking);
                this.moveLeft();
            }
        }, 1000 / 80);
    }
}
