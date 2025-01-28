let canvas;
let world;
let keyboard = new Keyboard();
let soundEnabled = true;
let sound_Game = new Audio('audio/latin-traditional-music-spanish-mexican-background-intro-theme-258024.mp3');
sound_Game.volume = 0.04;

function init() {
    initLevel();
    canvas = document.getElementById("canvas");
    world = new World(canvas, keyboard);
}

document.addEventListener('DOMContentLoaded', () => {
    const startButton = document.getElementById('startButton');
    const coveredImage = document.querySelector('.coveredImage');
    startButton.addEventListener('click', () => {
        setTimeout(() => {
            if (coveredImage && startButton) {
                coveredImage.style.display = 'none';
                startButton.style.display = 'none';
            }
        }, 1000);
        if (soundEnabled) sound_Game.play();
        init(); 
    });

    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        if (world) {
            world.resetWorld();
            init(); 
        }
    });

    const menuButton = document.getElementById('menuButton');
    menuButton.addEventListener('click', () => {
        window.location.href = 'index.html'; 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const soundButton = document.getElementById('soundButton');
    const soundButtonImage = soundButton.querySelector('img');
    soundButton.addEventListener('click', () => {
        soundEnabled = !soundEnabled;
        soundButtonImage.src = soundEnabled ? 'img/high-volume (1).png' : 'img/volume.png';
        soundEnabled ? sound_Game.play() : (sound_Game.pause(), sound_Game.currentTime = 0);
        world?.moveableObjects?.forEach(obj => obj.toggleSounds(soundEnabled));
    });
});

window.addEventListener('keydown', (e) => {

    if (e.keyCode == 39)
        keyboard.RIGHT = true;

    if (e.keyCode == 37)
        keyboard.LEFT = true;

    if (e.keyCode == 38)
        keyboard.UP = true;

    if (e.keyCode == 40)
        keyboard.DOWN = true;

    if (e.keyCode == 32)
        keyboard.SPACE = true;

    if (e.keyCode == 68)
        keyboard.D = true;
});

window.addEventListener('keyup', (e) => {

    if (e.keyCode == 39)
        keyboard.RIGHT = false;

    if (e.keyCode == 37)
        keyboard.LEFT = false;

    if (e.keyCode == 38)
        keyboard.UP = false;

    if (e.keyCode == 40)
        keyboard.DOWN = false;

    if (e.keyCode == 32)
        keyboard.SPACE = false;

    if (e.keyCode == 68)
        keyboard.D = false;
});
