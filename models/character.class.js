/**
 * Repräsentiert den spielbaren Charakter (Pepe) im Spiel,
 * inklusive Animationen für Laufen, Springen, Schlafen,
 * Schaden und Tod.
 * @extends MoveableObject
 */
class Character extends MoveableObject {

    /**
     * Bildpfade für die Lauf-Animation.
     * @type {string[]}
     */
    Images_Walking = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'
    ];

    /**
     * Bildpfade für die Sprung-Animation.
     * @type {string[]}
     */
    Images_Jumping = [
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-38.png'
    ];

    /**
     * Bildpfade für die stehende (Idle) Animation.
     * @type {string[]}
     */
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

    /**
     * Bildpfade für die Schlaf-Animation (längerer Idle-Zustand).
     * @type {string[]}
     */
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

    /**
     * Bildpfade für die Todes-Animation.
     * @type {string[]}
     */
    Images_Dead = [
        'img/2_character_pepe/5_dead/D-51.png',
        'img/2_character_pepe/5_dead/D-52.png',
        'img/2_character_pepe/5_dead/D-53.png',
        'img/2_character_pepe/5_dead/D-54.png',
        'img/2_character_pepe/5_dead/D-55.png',
        'img/2_character_pepe/5_dead/D-56.png',
        'img/2_character_pepe/5_dead/D-57.png'
    ];

    /**
     * Bildpfade für die Verletzungs-Animation.
     * @type {string[]}
     */
    Images_Hurt = [
        'img/2_character_pepe/4_hurt/H-41.png',
        'img/2_character_pepe/4_hurt/H-42.png',
        'img/2_character_pepe/4_hurt/H-43.png'
    ];

    /**
     * Objekt, das die Kollisionsgrenzen gegenüber
     * der eigentlichen Bildgröße anpasst.
     * @type {{ top: number, left: number, right: number, bottom: number }}
     */
    offset = {
        top: 40,
        left: 25,
        right: 25,
        bottom: 0,
    };

    /**
     * ID für das Intervall, das die Bewegungs-Updates steuert.
     * @type {number|undefined}
     */
    intervalIDMovement;

    /**
     * ID für das Intervall, das die Animations-Updates steuert.
     * @type {number|undefined}
     */
    intervalIDAnimation;

    /**
     * Referenz auf die Spielwelt, in der sich der Charakter befindet.
     * @type {World}
     */
    world;

    /**
     * Grundgeschwindigkeit des Charakters (horizontale Bewegung).
     * @type {number}
     */
    speed = 5;

    /**
     * Gibt an, ob die Sprung-Animation gerade abgespielt wird.
     * @type {boolean}
     */
    isJumpingAnimationPlaying = false;

    /**
     * Gibt an, ob der Charakter sich gerade im Schlaf-Modus befindet.
     * @type {boolean}
     */
    isSleeping = false;

    /**
     * Speichert den Zeitpunkt der letzten Bewegung (in Millisekunden),
     * um zu überprüfen, ob der Charakter lange inaktiv war (Schlaf-Modus).
     * @type {number}
     */
    lastMovementTime = Date.now();

    /**
     * Erzeugt eine neue Charakterinstanz,
     * lädt alle benötigten Bilder und startet Animationsprozesse.
     */
    constructor() {
        super();
        // Bilder laden
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
     * Startet zwei Intervalle:
     * 1) Interval für Bewegungsprüfungen (60x pro Sekunde)
     * 2) Interval für Animationswechsel (10x pro Sekunde)
     */
    animate() {
        this.intervalIDMovement = setInterval(() => {
            let isMoving = false;

            // Rechts
            if (this.world.keyboard.RIGHT && this.x < 2250) {
                isMoving = this.moveRightAndPlaySound();
            }
            // Links
            if (this.world.keyboard.LEFT && this.x > -600) {
                isMoving = this.moveLeftAndPlaySound();
            }
            // Springen (nur wenn am Boden)
            if (this.world.keyboard.SPACE && !this.isAboveGround()) {
                isMoving = this.jumpAndPlaySound();
            }

            // Kamera verschieben
            this.world.camera_x = -this.x + 100;

            // Laufgeräusch nur abspielen, wenn tatsächlich Bewegung
            if (!isMoving) {
                // Sound stoppen
                AudioManager.pause('running');
            } else {
                this.lastMovementTime = Date.now();
                if (this.isSleeping) {
                    this.isSleeping = false;
                }
            }

            // Prüfen, ob Charakter einschläft
            this.checkForSleep();

        }, 1000 / 60);

        this.intervalIDAnimation = setInterval(() => {
            if (this.isDead()) {
                this.playAnimation(this.Images_Dead);
            } else if (this.isHurt()) {
                this.playAnimation(this.Images_Hurt);
            } else if (this.isAboveGround()) {
                // Sprung-Animation nur einmal durchlaufen
                if (!this.isJumpingAnimationPlaying) {
                    this.isJumpingAnimationPlaying = true;
                    this.playAnimationOnce(this.Images_Jumping, () => {
                        this.isJumpingAnimationPlaying = false;
                    });
                }
            } else if (this.isSleeping) {
                this.playAnimation(this.Images_Sleeping);
            } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
                this.playAnimation(this.Images_Walking);
            } else {
                this.playAnimation(this.Images_Standing);
            }
        }, 100);
    }

    /**
     * Prüft, ob der Charakter einschläft,
     * falls er seit 5 Sekunden (5000 ms) nicht mehr bewegt wurde.
     */
    checkForSleep() {
        if (!this.isSleeping && Date.now() - this.lastMovementTime > 5000) {
            this.isSleeping = true;
        }
    }

    /**
     * Spielt eine angegebene Animation einmalig ab und führt optional
     * eine Callback-Funktion aus, wenn sie beendet ist.
     * @param {string[]} images - Array mit den Bildpfaden für die Animation.
     * @param {Function} [callback] - Optionaler Rückruf nach Ende der Animation.
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
     * Bewegt den Charakter nach rechts
     * und startet das Laufgeräusch.
     * @returns {boolean} true, wenn sich der Charakter bewegt.
     */
    moveRightAndPlaySound() {
        this.moveRight();
        this.otherDirection = false;
        // Lauf-Sound
        AudioManager.play('running', 0.4); // z.B. etwas leiser
        return true;
    }

    /**
     * Bewegt den Charakter nach links
     * und startet das Laufgeräusch.
     * @returns {boolean} true, wenn sich der Charakter bewegt.
     */
    moveLeftAndPlaySound() {
        this.moveLeft();
        this.otherDirection = true;
        // Lauf-Sound
        AudioManager.play('running', 0.8);
        return true;
    }

    /**
     * Lässt den Charakter springen
     * und spielt optional ein Sprunggeräusch ab.
     * @returns {boolean} true, wenn sich der Charakter bewegt.
     */
    jumpAndPlaySound() {
        this.jump();
        // ggf. Sprung-Sound ergänzen (wenn du eine extra MP3 hast)
        // AudioManager.play('jumpSound', 0.5);
        return true;
    }

    /**
     * Stoppt die Bewegung und Animation des Charakters.
     * Pausiert zusätzlich das Laufgeräusch.
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
     * Setzt die Charakterposition und relevante Eigenschaften zurück,
     * sodass ein Neustart möglich ist.
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
