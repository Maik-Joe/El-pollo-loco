class Chicken extends MoveableObject {

    y = 350;
    width = 80;
    height = 80; 
    
    Images_Walking = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png'
    ];

    offset = {
        top : 20,
        left : 20,
        right: 20,
        bottom : 20,  
    };
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.x = 250 + Math.random() * 2000;
        this.speed = 0.15 + Math.random() * 0.15;
        this.loadImages(this.Images_Walking);
        this.animate();
        
    }

    animate() {
        this.moveLeft();
        
        setInterval(() => {
            this.playAnimation(this.Images_Walking);
        },60); 

        setInterval(() => {
            this.moveLeft();
        }, 1000 / 60);
    };   
}