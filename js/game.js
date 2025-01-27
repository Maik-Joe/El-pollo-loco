let canvas;
let world;
let keyboard = new Keyboard();
let sound_Game = new Audio('audio/latin-traditional-music-spanish-mexican-background-intro-theme-258024.mp3');
sound_Game.volume = 0.04;

function init() {
    console.log("init() wurde aufgerufen nach Reset");  // Debugging-Zeile hinzufügen
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
        sound_Game.play();
        init(); 
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const restartButton = document.getElementById('restartButton');
    restartButton.addEventListener('click', () => {
        console.log("Restart button clicked"); 
        if (world) {
            world.resetWorld();
            init(); 
        }
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
