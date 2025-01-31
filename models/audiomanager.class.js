class AudioManager {

    static isSoundEnabled = JSON.parse(localStorage.getItem('soundEnabled')) ?? true;
    
    static sounds = {
        running: new Audio('audio/running-in-grass-6237_O3hpfyba.mp3'),
        coins: new Audio('audio/coin-recieved-230517_424ntki3.mp3'),
        bottle: new Audio('audio/bottle-pop-45531_wTjI9toB.mp3'),
        chicken: new Audio('audio/chicken-noise-196746_J6JdS05m.mp3'),
        hurt: new Audio('audio/young-man-being-hurt-95628_Y7RMBAUy.mp3'),
        boss: new Audio('audio/chicken-noises-223056.mp3'),
        win: new Audio('audio/short-success-sound-glockenspiel-treasure-video-game-6346.mp3')
    };

    /**
     * Plays a sound if audio is enabled and the file is loaded.
     * @param {string} soundName - The key name of the sound in the sounds object.
     * @param {number} [volume=1] - Optional, volume level (0-1).
     */
    static play(soundName, volume = 1) {
        const sound = this.sounds[soundName];
        if (sound && this.isSoundEnabled && sound.readyState >= 2) {
            sound.pause();
            sound.volume = volume;
            sound.play().catch(() => {});
        }
    }

    /**
     * Pauses a currently playing sound.
     * @param {string} soundName - Name of the sound to pause.
     */
    static pause(soundName) {
        const sound = this.sounds[soundName];
        if (sound && !sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Toggles sound on or off. If disabled, stops all playing sounds.
     * @param {boolean} enabled - true to enable sound, false to disable.
     */
    static toggleSounds(enabled) {
        this.isSoundEnabled = enabled;
        localStorage.setItem('soundEnabled', JSON.stringify(enabled));
        if (!enabled) {
            Object.values(this.sounds).forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
            });
        }
    }
}
