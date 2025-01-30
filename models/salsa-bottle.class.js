class SalsaBottle extends MoveableObject {
    
    width = 60;
    height = 60;
    Images_Walking = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png'
    ];
    offset = {
        top: 20,
        left: 40,
        right: 30,
        bottom: 0
    };

    /**
     * Creates a new SalsaBottle at a random X and Y position
     * and loads the required images.
     */
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = -400 + Math.random() * 2000;
        this.y = 360 + Math.random() * 15;
        this.loadImages(this.Images_Walking);
        this.animate();
    }

    /**
     * Switches between the salsa bottle images at fixed intervals.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.Images_Walking);
        }, 200);
    }
}
