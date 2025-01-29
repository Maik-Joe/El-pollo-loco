/************************************************************
 * Repräsentiert den Endboss des Spiels und regelt dessen 
 * Animationen sowie Interaktionen wie Schaden und Angriff.
 * @extends MoveableObject
 ************************************************************/
class Endboss extends MoveableObject {

    // Bilder für den Alarmzustand des Endbosses
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

    // Bilder für den Angriffsmodus des Endbosses
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

    // Bilder für den Zustand des Endbosses, wenn er verletzt ist
    Images_Hurt = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png'
    ];

    // Bilder für den Zustand des Endbosses, wenn er tot ist
    Images_Dead = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png'
    ];

    width = 250; // Breite des Endbosses
    height = 300; // Höhe des Endbosses
    y = 150; // Vertikale Position des Endbosses
    speed = 5; // Geschwindigkeit des Endbosses
    energy = 100; // Energie des Endbosses

    intervalIDAnimation; // Interval-ID für die Animation

    offset = { // Versatz für Kollisionsberechnungen
        top: 0,
        left: 75,
        right: 75,
        bottom: 0,
    };

    /**
     * Konstruktor der Endboss-Klasse
     */
    constructor() {
        super().loadImage(this.Images_Alert[0]);
        this.loadImages(this.Images_Alert);
        this.loadImages(this.Images_Attack);
        this.loadImages(this.Images_Hurt);
        this.loadImages(this.Images_Dead);
        
        this.x = 2300;  // Startposition des Endbosses

        this.animate();
    }

    /**
     * Animation des Endbosses
     */
    animate() {
        this.intervalIDAnimation = setInterval(() => {
            if (this.isDead()) {
                // Boss-Sound pausieren, falls tot
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
     * Überprüfen, ob der Endboss angreift
     * @returns {boolean}
     */
    isAttacking() {
        // Beispiel: Wenn Energie < 90, Angriff
        if (this.energy < 90) {
            this.speed = 15;
            this.moveLeft();
        }
        return this.energy < 90;
    }

    /**
     * Bewegung des Endbosses stoppen
     */
    stopMovementEndboss() {
        // Bei einem Sieg: "Win"-Sound abspielen
        AudioManager.play('win', 1);

        setTimeout(() => {
            this.speed = 0;
            // Boss-Sound + Win-Sound wieder pausieren
            AudioManager.pause('boss');
            AudioManager.pause('win');
            
            clearInterval(this.intervalIDAnimation);
        }, 2000);
    }
}
