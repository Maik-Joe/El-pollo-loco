class Chicken extends MoveableObject {

    y = 350;
    width = 80;
    height = 80; 
    
    
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');

        this.x = 250 + Math.random() * 500;
    }

   
}