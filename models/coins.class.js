class Coins extends MoveableObject {
    
        width = 80;
        height = 80; 
        
        Images_Walking = [
            'img/8_coin/coin_1.png',
            'img/8_coin/coin_2.png',
        ];
        
        constructor() {
            super().loadImage('img/8_coin/coin_1.png');
            this.x = 150 + Math.random() * 2000;
            this.y = 220 + Math.random() * 35;
            this.loadImages(this.Images_Walking);
            this.animate();
            
        }
    
        animate() {
            setInterval(() => {
                this.playAnimation(this.Images_Walking);
            },300); 
        };
    
    }
