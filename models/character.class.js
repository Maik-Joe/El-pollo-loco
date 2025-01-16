class Character extends MoveableObject {

    Images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    Images_Jumping = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png',
    ];

    Images_Standing = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png',
        'img/2_character_pepe/1_idle/idle/I-4.png',
        'img/2_character_pepe/1_idle/idle/I-5.png',
        'img/2_character_pepe/1_idle/idle/I-6.png',
        'img/2_character_pepe/1_idle/idle/I-7.png',
        'img/2_character_pepe/1_idle/idle/I-8.png',
        'img/2_character_pepe/1_idle/idle/I-9.png',
        'img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    Images_Sleeping = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png',
        'img/2_character_pepe/1_idle/long_idle/I-14.png',
        'img/2_character_pepe/1_idle/long_idle/I-15.png',
        'img/2_character_pepe/1_idle/long_idle/I-16.png',
        'img/2_character_pepe/1_idle/long_idle/I-17.png',
        'img/2_character_pepe/1_idle/long_idle/I-18.png',
        'img/2_character_pepe/1_idle/long_idle/I-19.png',
        'img/2_character_pepe/1_idle/long_idle/I-20.png',
    ];

    Images_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    Images_Hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    offset = {
        top: 20,
        left: 10,
        right: 10,
        bottom: 10,
    };

    world;
    speed = 5;
    isJumpingAnimationPlaying = false;
    sound_Walking = new Audio('audio/running-in-grass-6237_O3hpfyba.mp3');


    constructor() {
        super();
        this.loadImages(this.Images_Standing);
        this.loadImages(this.Images_Walking);
        this.loadImages(this.Images_Jumping);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Dead);
        this.loadImages(this.Images_Sleeping);
        this.loadImage(this.Images_Standing[0]);
        this.animate();
        this.applyGravity();
    }


    animate() {
        setInterval(() => {
            let isMoving = false;
            if (this.world.keyboard.RIGHT && this.x < 2250) {
                isMoving = this.moveRightAndPlaySound();
            }
            if (this.world.keyboard.LEFT && this.x > -600) {
                isMoving = this.moveLeftAndPlaySound();
            }
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                isMoving = this.jumpAndPlaySound();
            }
            this.world.camera_x = -this.x + 100;
            if (!isMoving) {
                this.sound_Walking.pause();
            }
        }, 1000 / 60);


        setInterval(() => {

            if (this.isDead()) {
                this.playAnimation(this.Images_Dead)
            } else if (this.isHurt()) {
                this.playAnimation(this.Images_Hurt)
            }
            else if (this.isAboveGround()) {
                if (!this.isJumpingAnimationPlaying) {
                    this.isJumpingAnimationPlaying = true;
                    this.playAnimationOnce(this.Images_Jumping, () => {
                        this.isJumpingAnimationPlaying = false;
                    });
                }
            }
            else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.Images_Walking);
            }
            else {
                this.playAnimation(this.Images_Standing);
            }
        }, 100);
    }


    playAnimationOnce(images, callback) {
        let currentImageIndex = 0;
        const interval = setInterval(() => {
            this.img = this.imageCache[images[currentImageIndex]];
            currentImageIndex++;
            if (currentImageIndex >= images.length) {
                clearInterval(interval);
                if (callback) callback();
            }
        }, 120);
    }


    moveRightAndPlaySound() {
        this.moveRight();
        this.otherDirection = false;
        if (this.sound_Walking.paused) this.sound_Walking.play();
        return true;
    }


    moveLeftAndPlaySound() {
        this.moveLeft();
        this.otherDirection = true;
        if (this.sound_Walking.paused) this.sound_Walking.play();
        return true;
    }


    jumpAndPlaySound() {
        this.jump();
        return true;
    }
}
