/************************************************************
 * Repräsentiert den Gesundheitsstatus (Lebensbalken) des 
 * Charakters oder einer Figur im Spiel.
 * @extends DrawableObject
 ************************************************************/
class StatusBar extends DrawableObject {

    /**
     * Bildpfade für verschiedene Zustände der Lebensanzeige.
     * @type {string[]}
     */
    Images_Health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    /**
     * Prozentangabe des aktuellen Gesundheitszustands (0-100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Erstellt eine neue StatusBar-Instanz, lädt die passenden Bilder
     * und initialisiert ihren Prozentwert, Position und Größe.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Health);
        this.setPercentage(100);
        this.x = 20;
        this.y = 0;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Aktualisiert den aktuellen Prozentwert der Lebensanzeige
     * und wählt das entsprechende Bild aus.
     * 
     * @param {number} percentage - Neuer Prozentwert (zwischen 0 und 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Health[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt anhand des aktuellen Prozentwerts, welches Bild
     * angezeigt werden soll.
     * 
     * @returns {number} Index des zu verwendenden Bildes aus {@link Images_Health}.
     */
    resolveImageIndex() {
        if (this.percentage === 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
