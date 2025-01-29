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
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

/**
 * Wechselt in den Fullscreen-Modus.
 */
/**
 * Wechselt in den Fullscreen-Modus und erzwingt Querformat.
 */
function toggleFullscreen() {
    let gameContainer = document.documentElement; // Ganze Seite als Fullscreen
    
    // Versuche, das Querformat zu aktivieren
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {
        });
    }

    // Fullscreen-Modus aktivieren
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) { // Firefox
        gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) { // Chrome, Safari, Edge
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) { // IE/Edge
        gameContainer.msRequestFullscreen();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    /**
     * Startet das Spiel, blendet das Startmenü aus und spielt Musik.
     */
    const startButton = document.getElementById('startButton');
    const coveredImage = document.querySelector('.coveredImage');
    const startInfo = document.getElementById('startInfo');

    if (startButton) {
        startButton.addEventListener('click', () => {
            toggleFullscreen(); // Fullscreen-Modus aktivieren

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
    }

    /**
     * Neustart-Funktion: Setzt die Welt zurück und startet sie neu.
     */
    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
        restartButton.addEventListener('click', () => {
            if (world) {
                world.resetWorld();
                sound_Game.play();
                init();
            }
        });
    }

    /**
     * Navigiert zurück zum Hauptmenü.
     */
    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    /**
     * Steuerung für das Ein- und Ausschalten des Sounds.
     */
    const buttons = [
        document.getElementById('soundButton'),
        document.getElementById('soundButton2')
    ].filter(Boolean); // Entfernt `null`-Elemente, falls ein Button nicht existiert

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            const newSrc = soundEnabled ? 'img/high-volume (1).png' : 'img/volume.png';
            buttons.forEach(btn => btn.querySelector('img').src = newSrc);

            if (soundEnabled) {
                sound_Game.play();
            } else {
                sound_Game.pause();
                sound_Game.currentTime = 0;
            }

            AudioManager.toggleSounds(soundEnabled);
        });
    });

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
    const button = document.getElementById(buttonId);
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
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = true; break;
        case 37: keyboard.LEFT = true; break;
        case 38: keyboard.UP = true; break;
        case 40: keyboard.DOWN = true; break;
        case 32: keyboard.SPACE = true; break;
        case 68: keyboard.D = true; break;
    }
});

/**
 * Hört auf das Loslassen von Tasten und setzt die Variablen auf `false`.
 */
window.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
        case 39: keyboard.RIGHT = false; break;
        case 37: keyboard.LEFT = false; break;
        case 38: keyboard.UP = false; break;
        case 40: keyboard.DOWN = false; break;
        case 32: keyboard.SPACE = false; break;
        case 68: keyboard.D = false; break;
    }
});

/**
 * Blendet das Overlay aus und startet das Video.
 */
document.addEventListener('DOMContentLoaded', () => {
    const overlayStartButton = document.getElementById("overlay-start");
    const overlay = document.getElementById("overlay");
    const video = document.getElementById("myVideo");

    if (overlayStartButton) {
        overlayStartButton.addEventListener("click", function () {
            if (overlay) overlay.style.display = "none";
            if (video) {
                video.play().catch(() => {});
            }
        });
    }
});
