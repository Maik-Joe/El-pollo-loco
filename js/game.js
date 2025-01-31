let canvas;
let world;
let keyboard = new Keyboard();
let soundEnabled = JSON.parse(localStorage.getItem('soundEnabled')) ?? true;
let sound_Game = new Audio('audio/latin-traditional-music-spanish-mexican-background-intro-theme-258024.mp3');
sound_Game.volume = 0.04;
sound_Game.loop = true;

/**
 * Initializes the game by loading the level and creating the world.
 */
function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

/**
 * Initializes event listeners once the DOM content is fully loaded.
 * This function sets up interactions for various buttons in the UI, including:
 * - Start button: Triggers the game start.
 * - Restart button: Restarts the game.
 * - Fullscreen button: Toggles fullscreen mode.
 * - Menu button: Redirects the user back to the main menu.
 * - Sound and mobile controls: Ensures additional UI components are set up.
 * @listens DOMContentLoaded
 * @fires handleStartButtonClick - When the start button is clicked.
 * @fires handleRestart - When the restart button is clicked.
 * @fires toggleFullscreen - When the fullscreen button is clicked.
 */
document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    if (startButton) {
        startButton.addEventListener('click', handleStartButtonClick);
    }

    const restartButton = document.getElementById('restartButton');
    if (restartButton) {
        restartButton.addEventListener('click', handleRestart);
    }

    const fullscreenButton = document.getElementById('fullscreen');
    if (fullscreenButton) {
        fullscreenButton.addEventListener('click', toggleFullscreen);
    }

    const menuButton = document.getElementById('menuButton');
    if (menuButton) {
        menuButton.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }

    setupSoundButtons();
    setupMobileControls();
});

/**
 * Handles the start button click event.
 */
function handleStartButtonClick() {
    setTimeout(() => {
        const elements = [
            document.querySelector('.coveredImage'),
            document.getElementById('startButton'),
            document.getElementById('startInfo'),
            document.getElementById('impressum'),
            document.getElementById('fullscreen')
        ];
        elements.forEach(el => { if (el) el.style.display = 'none'; });
    }, 1000);

    if (soundEnabled) sound_Game.play();
    init();
}

/**
 * Handles the restart button click event.
 */
function handleRestart() {
    if (world) {
        world.resetWorld();
        init();
    }
}

/**
 * Sets up sound buttons and their event listeners.
 */
function setupSoundButtons() {
    const buttons = [
        document.getElementById('soundButton'),
        document.getElementById('soundButton2')
    ].filter(Boolean);

    buttons.forEach(button => {
        button.addEventListener('click', toggleSound);
    });
}

/**
 * Toggles sound on and off.
 */
function toggleSound() {
    soundEnabled = !soundEnabled;
    localStorage.setItem('soundEnabled', JSON.stringify(soundEnabled));

    updateSoundIcons();

    if (soundEnabled) {
        sound_Game.play();
    } else {
        sound_Game.pause();
        sound_Game.currentTime = 0;
    }

    AudioManager.toggleSounds(soundEnabled);
}

/**
 * Updating the Sound-Images
 */
function updateSoundIcons() {
    const newSrc = soundEnabled ? 'img/high-volume (1).png' : 'img/volume.png';
    document.querySelectorAll('#soundButton img, #soundButton2 img')
        .forEach(img => img.src = newSrc);
}
document.addEventListener('DOMContentLoaded', updateSoundIcons);

/**
 * Sets up mobile control buttons.
 */
function setupMobileControls() {
    setupTouchControl('btn-left', 'LEFT');
    setupTouchControl('btn-right', 'RIGHT');
    setupTouchControl('btn-jump', 'SPACE');
    setupTouchControl('btn-throw', 'D');
}

/**
 * Binds a mobile button to a keyboard input.
 * @param {string} buttonId - The ID of the button.
 * @param {string} key - The corresponding key to simulate.
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
 * Toggles fullscreen mode.
 */
function toggleFullscreen() {
    let gameContainer = document.documentElement;
    if (screen.orientation && screen.orientation.lock) {
        screen.orientation.lock('landscape').catch(() => {});
    }
    if (gameContainer.requestFullscreen) {
        gameContainer.requestFullscreen();
    } else if (gameContainer.mozRequestFullScreen) {
        gameContainer.mozRequestFullScreen();
    } else if (gameContainer.webkitRequestFullscreen) {
        gameContainer.webkitRequestFullscreen();
    } else if (gameContainer.msRequestFullscreen) {
        gameContainer.msRequestFullscreen();
    }
}

/**
 * Toggles the visibility of the overlay.
 */
function toggleOverlayImp() {
    const overlay = document.getElementById("overlay-imp");
    const impressumBtn = document.getElementById("impressum");
    const closeBtn = document.getElementById("close");

    // Ermittle den aktuellen Anzeigestatus des Overlays
    const overlayDisplay = window.getComputedStyle(overlay).display;

    if (overlayDisplay === "flex") {
        // Overlay verstecken
        overlay.style.display = "none";
        // Zeige Impressum-Button und verstecke Close-Button
        impressumBtn.style.display = "block";
        closeBtn.style.display = "none";
    } else {
        // Overlay anzeigen
        overlay.style.display = "flex";
        // Verstecke Impressum-Button und zeige Close-Button
        impressumBtn.style.display = "none";
        closeBtn.style.display = "block";
    }
}


/**
 * Listens for keydown events and updates keyboard state.
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
 * Listens for keyup events and updates keyboard state.
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
 * Blend Overlay Video.
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

