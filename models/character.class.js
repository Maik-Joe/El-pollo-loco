class Character extends MoveableObject{

    ImagesCharacter = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    currentImage = 0;

    constructor() {
        super().loadImage('img/2_character_pepe/2_walk/W-21.png');
        this.loadImages(this.ImagesCharacter);

        this.animate();
    }

    animate() {
        setInterval(() => {
        let i = this.currentImage % this.ImagesCharacter.length;
        let path = this.ImagesCharacter[i];
        this.img = this.imageCache[path];
        this.currentImage++;
        },60); 
    };


    jump() {

    };
}