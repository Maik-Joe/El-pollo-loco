class Chicken extends MoveableObject {
    
    y = 350;
    width = 80;
    height = 80;
    speed = 0;

    Images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    Images_Dead = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ];

    offset = {
        top: -5,
        left: -5,
        right: -5,
        bottom: 20
    };

    /**
     * Creates a new Chicken instance, sets a random x-position and speed,
     * and loads all necessary images before starting its animation.
     */
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 450 + Math.random() * 2000;
        this.speed = 0.5 + Math.random() * 3;
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Dead);
        this.animate();
    }

    /**
     * Moves the chicken to the left and periodically checks
     * whether the chicken is dead or still walking.
     */
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
        }, 60);
    }
}
