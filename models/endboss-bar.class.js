/************************************************************
 * Repräsentiert die Lebensanzeige (Statusbalken) des Endbosses.
 * @extends DrawableObject
 ************************************************************/
class EndbossBar extends DrawableObject {

    /**
     * Bildpfade für die verschiedenen Zustände der Endboss-Gesundheitsanzeige.
     * @type {string[]}
     */
    Images_Health = [
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    /**
     * Prozentualer Wert der aktuellen Endboss-Gesundheit (0-100).
     * @type {number}
     */
    percentage = 100;

    /**
     * Numerischer Wert der Endboss-Gesundheit (kann für weitere Funktionen verwendet werden).
     * @type {number}
     */
    energy = 100;

    /**
     * Erzeugt eine neue Endboss-Lebensanzeige, lädt die passenden Bilder
     * und initialisiert die Positions- und Größenwerte.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Health);
        this.setPercentage(100);
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Setzt den prozentualen Wert der Endboss-Gesundheit und
     * aktualisiert das entsprechende Bild in der Anzeige.
     * 
     * @param {number} percentage - Neuer Prozentwert (0 - 100).
     */
    setPercentage(percentage) {
        // Beschränkt den Wert zwischen 0 und 100
        percentage = Math.max(0, Math.min(100, percentage));
        let index = this.resolveImageIndex(percentage);
        let path = this.Images_Health[index];
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt den Index des anzuzeigenden Bildes basierend auf dem Prozentsatz.
     * 
     * @param {number} percentage - Der aktuelle Prozentwert der Endboss-Gesundheit (0 - 100).
     * @returns {number} Index des zu verwendenden Bildes aus dem Array {@link Images_Health}.
     */
    resolveImageIndex(percentage) {
        if (percentage === 100) {
            return 5;
        } else if (percentage > 80) {
            return 4;
        } else if (percentage > 60) {
            return 3;
        } else if (percentage > 40) {
            return 2;
        } else if (percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
