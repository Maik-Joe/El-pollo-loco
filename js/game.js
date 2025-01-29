/**
 * Die Spielfläche (Canvas) und die Spielwelt (World)
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Die Spielwelt
 * @type {World}
 */
let world;

/**
 * Tastatursteuerung
 * @type {Keyboard}
 */
let keyboard = new Keyboard();

/**
 * Gibt an, ob der Sound aktiviert ist
 * @type {boolean}
 */
let soundEnabled = true;

/**
 * Hintergrundmusik für das Spiel
 * @type {HTMLAudioElement}
 */
let sound_Game = new Audio('audio/latin-traditional-music-spanish-mexican-background-intro-theme-258024.mp3');
sound_Game.volume = 0.04;

/**
 * Initialisiert das Spiel, indem das Level geladen und die Welt erstellt wird.
 */
function init() {
    initLevel();
    canvas = /** @type {HTMLCanvasElement} */ (document.getElementById("canvas"));
    world = new World(canvas, keyboard);
}

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Startet das Spiel, blendet das Startmenü aus und spielt Musik.
     */
    const startButton = /** @type {HTMLButtonElement} */ (document.getElementById('startButton'));
    const coveredImage = /** @type {HTMLElement} */ (document.querySelector('.coveredImage'));
    const startInfo = /** @type {HTMLElement} */ (document.getElementById('startInfo'));
    startButton.addEventListener('click', () => {
        setTimeout(() => {
            if (coveredImage && startButton && startInfo) {
                coveredImage.style.display = 'none';
                startButton.style.display = 'none';
                startInfo.style.display = 'none';
            }
        }, 1000);
        if (soundEnabled) sound_Game.play();
        init(); 
    });

    /**
     * Neustart-Funktion: Setzt die Welt zurück und startet sie neu.
     */
    const restartButton = /** @type {HTMLButtonElement} */ (document.getElementById('restartButton'));
    restartButton.addEventListener('click', () => {
        if (world) {
            world.resetWorld();
            sound_Game.play();
            init(); 
        }
    });

    /**
     * Navigiert zurück zum Hauptmenü.
     */
    const menuButton = /** @type {HTMLButtonElement} */ (document.getElementById('menuButton'));
    menuButton.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });

    /**
     * Steuerung für das Ein- und Ausschalten des Sounds.
     */
    const buttons = [
        /** @type {HTMLButtonElement} */ (document.getElementById('soundButton')),
        /** @type {HTMLButtonElement} */ (document.getElementById('soundButton2'))
    ];
    let soundEnabled = true;
    buttons.forEach(button => button.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        const newSrc = soundEnabled ? 'img/high-volume (1).png' : 'img/volume.png';
        buttons.forEach(btn => (btn.querySelector('img')).src = newSrc);
    
        // Hintergrundmusik separat ein-/ausschalten
        if (soundEnabled) {
            sound_Game.play();
        } else {
            sound_Game.pause();
            sound_Game.currentTime = 0;
        }
    
        // Nun ALLE Sounds (die im AudioManager sind) toggeln
        AudioManager.toggleSounds(soundEnabled);
    }));
    
    
    setupMobileControls();
});

/**
 * Initialisiert die mobile Steuerung
 */
function setupMobileControls() {
    setupTouchControl('btn-left', 'LEFT');
    setupTouchControl('btn-right', 'RIGHT');
    setupTouchControl('btn-jump', 'SPACE');
    setupTouchControl('btn-throw', 'D');
}

/**
 * Verknüpft eine mobile Schaltfläche mit einer Tastatureingabe.
 * @param {string} buttonId - Die ID des Buttons.
 * @param {string} key - Die entsprechende Taste, die simuliert wird.
 */
function setupTouchControl(buttonId, key) {
    const button = /** @type {HTMLButtonElement} */ (document.getElementById(buttonId));
    if (button) {
        button.addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard[key] = true;
        });
        button.addEventListener('touchend', (e) => {
            e.preventDefault();
            keyboard[key] = false;
        });
    }
}

/**
 * Hört auf Tastendrücke und setzt die zugehörigen Variablen auf `true`.
 */
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 38) keyboard.UP = true;
    if (e.keyCode == 40) keyboard.DOWN = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
    if (e.keyCode == 68) keyboard.D = true;
});

/**
 * Hört auf das Loslassen von Tasten und setzt die Variablen auf `false`.
 */
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 38) keyboard.UP = false;
    if (e.keyCode == 40) keyboard.DOWN = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
    if (e.keyCode == 68) keyboard.D = false;
});
