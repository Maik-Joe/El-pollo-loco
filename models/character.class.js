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
        'img/2_character_pepe/3_jump/J-38.png'
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
        'img/2_character_pepe/1_idle/long_idle/I-20.png'
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
        top: 40,
        left: 25,
        right: 25,
        bottom: -5,
    };

    intervalIDMovement;
    intervalIDAnimation;
    world;
    speed = 5;
    isJumpingAnimationPlaying = false;
    isSleeping = false;
    lastMovementTime = Date.now();

    /**
     * Creates a new instance of the character, loads all necessary images,
     * and initializes animations and gravity.
     */
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

    /**
     * Starts two intervals:
     * 1) Movement checks at 60fps
     * 2) Animation updates at 10fps
     */
    animate() {
        this.intervalIDMovement = setInterval(() => {
            this.handleMovement();
            this.updateCamera();
            this.manageSound();
            this.checkForSleep();
        }, 1000 / 60);

        this.intervalIDAnimation = setInterval(() => {
            this.handleAnimation();
        }, 100);
    }

    /**
     * Handles the character's movement based on keyboard input.
     * Updates the last movement time and sleep state accordingly.
     */
    handleMovement() {
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

        this.lastMovementTime = isMoving ? Date.now() : this.lastMovementTime;
        this.isSleeping = isMoving ? false : this.isSleeping;
    }

    /**
     * Updates the camera position relative to the character's current x position.
     */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Pauses the running sound when the character is not moving.
     */
    manageSound() {
        if (!this.world.keyboard.RIGHT && !this.world.keyboard.LEFT) {
            AudioManager.pause('running');
        }
    }

    /**
     * Chooses which animation sequence should be played
     * based on the character's current state.
     */
    handleAnimation() {
        if (this.isDead()) {
            this.playAnimation(this.Images_Dead);
        } else if (this.isHurt()) {
            this.playAnimation(this.Images_Hurt);
        } else if (this.isAboveGround()) {
            this.playJumpingAnimation();
        } else if (this.isSleeping) {
            this.playAnimation(this.Images_Sleeping);
        } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
            this.playAnimation(this.Images_Walking);
        } else {
            this.playAnimation(this.Images_Standing);
        }
    }

    /**
     * Plays the jumping animation once if it's not already active,
     * then resets the jump animation flag.
     */
    playJumpingAnimation() {
        if (!this.isJumpingAnimationPlaying) {
            this.isJumpingAnimationPlaying = true;
            this.playAnimationOnce(this.Images_Jumping, () => {
                this.isJumpingAnimationPlaying = false;
            });
        }
    }

    /**
     * Checks if the character should enter sleep mode
     * if there has been no movement for more than 5 seconds.
     */
    checkForSleep() {
        if (!this.isSleeping && Date.now() - this.lastMovementTime > 5000) {
            this.isSleeping = true;
        }
    }

    /**
     * Plays a given animation once and optionally executes a callback
     * function when the animation finishes.
     * @param {string[]} images - Array of image paths for the animation.
     * @param {Function} [callback] - Optional callback executed after the animation ends.
     */
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

    /**
     * Moves the character to the right and plays the running sound.
     * @returns {boolean} True if the character is moving.
     */
    moveRightAndPlaySound() {
        this.moveRight();
        this.otherDirection = false;
        AudioManager.play('running', 0.4);
        return true;
    }

    /**
     * Moves the character to the left and plays the running sound.
     * @returns {boolean} True if the character is moving.
     */
    moveLeftAndPlaySound() {
        this.moveLeft();
        this.otherDirection = true;
        AudioManager.play('running', 0.8);
        return true;
    }

    /**
     * Makes the character jump and optionally plays a jump sound.
     * @returns {boolean} True if the character initiates a jump.
     */
    jumpAndPlaySound() {
        this.jump();
        // AudioManager.play('jumpSound', 0.5); // Uncomment if a jump sound is available
        return true;
    }

    /**
     * Stops character movement, pauses the running sound, and clears intervals.
     */
    stopMovement() {
        this.speed = 0;
        AudioManager.pause('running');
        setTimeout(() => {
            clearInterval(this.intervalIDMovement);
            clearInterval(this.intervalIDAnimation);
        }, 1000);
    }

    /**
     * Resets the character's position, speed, and state,
     * allowing for a new start.
     */
    reset() {
        this.x = 0;
        this.y = 0;
        this.speed = 5;
        this.loadImages(this.Images_Standing);
        this.loadImage(this.Images_Standing[0]);
        this.isJumpingAnimationPlaying = false;
        this.isSleeping = false;
        this.lastMovementTime = Date.now();
        this.animate();
        this.applyGravity();
    }
}
