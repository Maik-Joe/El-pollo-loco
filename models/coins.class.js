class Coins extends MoveableObject {

    width = 80;
    height = 80;
    
    Images_Walking = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png'
    ];
    offset = {
        top: 0,
        left: 40,
        right: 40,
        bottom: 80
    };

    /**
     * Creates a new coin at a random X and Y position,
     * loads all required images, and starts the animation loop.
     */
    constructor() {
        super().loadImage('img/8_coin/coin_1.png');
        this.x = 150 + Math.random() * 2000;
        this.y = 220 + Math.random() * 35;
        this.loadImages(this.Images_Walking);
        this.animate();
    }
    
    /**
     * Plays the coin animation at a recurring interval.
     */
    animate() {
        setInterval(() => {
            this.playAnimation(this.Images_Walking);
        }, 300);
    }
}
