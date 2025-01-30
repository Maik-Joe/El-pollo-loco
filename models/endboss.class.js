class Endboss extends MoveableObject {
    
    Images_Alert = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png'
    ];

    Images_Attack = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png'
    ];

    Images_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    Images_Dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    width = 250;
    height = 300;
    y = 150;
    speed = 5;
    energy = 100;

    intervalIDAnimation;
    offset = {
        top: 0,
        left: 75,
        right: 75,
        bottom: 0
    };

    /**
     * Creates a new Endboss instance, loads initial images,
     * sets its position, and starts the animation.
     */
    constructor() {
        super().loadImage(this.Images_Alert[0]);
        this.loadImages(this.Images_Alert);
        this.loadImages(this.Images_Attack);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Dead);

        this.x = 2300;
        this.animate();
    }

    /**
     * Animates the Endboss depending on its current state:
     * dead, hurt, attacking, or alert.
     */
    animate() {
        this.intervalIDAnimation = setInterval(() => {
            if (this.isDead()) {
                AudioManager.pause('boss');
                this.playAnimation(this.Images_Dead);
            } else if (this.isHurt()) {
                this.playAnimation(this.Images_Hurt);
            } else if (this.isAttacking()) {
                this.playAnimation(this.Images_Attack);
            } else {
                this.playAnimation(this.Images_Alert);
            }
        }, 140);
    }

    /**
     * Checks if the Endboss is in an attacking state.
     * @returns {boolean} True if attacking, otherwise false.
     */
    isAttacking() {
        if (this.energy < 90) {
            this.speed = 40;
            this.moveLeft();
        }
        return this.energy < 90;
    }

    /**
     * Stops the Endboss movement and plays the victory sound,
     * then clears intervals to end the animation.
     */
    stopMovementEndboss() {
        AudioManager.play('win', 1);
        setTimeout(() => {
            this.speed = 0;
            AudioManager.pause('boss');
            AudioManager.pause('win');
            clearInterval(this.intervalIDAnimation);
        }, 2000);
    }
}
