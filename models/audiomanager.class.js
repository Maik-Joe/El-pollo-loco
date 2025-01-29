/**
 * Ein zentraler Audio-Manager, der alle benötigten Audiodateien 
 * nur einmalig lädt und abspielt oder pausiert.
 */
class AudioManager {

    /**
     * Bestimmt, ob Audios abgespielt werden dürfen oder nicht.
     * @type {boolean}
     */
    static isSoundEnabled = true;

    /**
     * Enthält alle verfügbaren Sounds als Schlüssel-Wert-Paar.
     * @type {{ [key: string]: HTMLAudioElement }}
     */
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
     * Spielt einen Sound ab, wenn Ton aktiviert ist und 
     * die Audiodatei bereits geladen wurde.
     * @param {string} soundName - Der Schlüsselname des Sounds im Sounds-Objekt.
     * @param {number} [volume=1] - Optional, Lautstärke (0-1).
     */
    static play(soundName, volume = 1) {
        const sound = this.sounds[soundName];
        if (!sound) return; // Ungültiger Soundname
        
        if (this.isSoundEnabled && sound.readyState >= 2) {
            sound.pause();
            sound.volume = volume;
            sound.play().catch(() => { /* Fehler still ignorieren */ });
        }
    }

    /**
     * Pausiert (stoppt) einen Sound, falls er gerade abgespielt wird.
     * @param {string} soundName - Name des Sounds, der pausiert werden soll.
     */
    static pause(soundName) {
        const sound = this.sounds[soundName];
        if (sound && !sound.paused) {
            sound.pause();
            sound.currentTime = 0;
        }
    }

    /**
     * Aktiviert oder deaktiviert alle Sounds. Beim Deaktivieren 
     * werden alle Sounds pausiert.
     * @param {boolean} enabled - true zum Aktivieren, false zum Deaktivieren.
     */
    static toggleSounds(enabled) {
        this.isSoundEnabled = enabled;
        // Bei Deaktivierung alle Sounds pausieren und zurücksetzen
        if (!enabled) {
            Object.values(this.sounds).forEach(sound => {
                sound.pause();
                sound.currentTime = 0;
            });
        }
    }
}

