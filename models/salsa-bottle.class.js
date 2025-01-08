class SalsaBottle extends MoveableObject {
    
    width = 60;
    height = 60; 
    
    Images_Walking = [
        'img/6_salsa_bottle/1_salsa_bottle_on_ground.png',
        'img/6_salsa_bottle/2_salsa_bottle_on_ground.png',
    ];
    
    constructor() {
        super().loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
        this.x = 150 + Math.random() * 2000;
        this.y = 360 + Math.random() * 15;
        this.loadImages(this.Images_Walking);
        this.animate();
        
    }

    animate() {
        setInterval(() => {
            this.playAnimation(this.Images_Walking);
        },200); 
    };

}