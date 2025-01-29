/**
 * Repräsentiert eine Anzeige (Statusbalken) für gesammelte Münzen.
 * @extends DrawableObject
 */
class CoinBar extends DrawableObject {

    /**
     * Bildpfade für den Münzbalken in verschiedenen Zuständen.
     * @type {string[]}
     */
    Images_Coins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    /**
     * Prozentwert der gesammelten Münzen (0% = kein Fortschritt, 100% = alles gesammelt).
     * @type {number}
     */
    percentage = 0; 

    /**
     * Erzeugt eine neue Münzleiste und lädt die entsprechenden Bilder.
     * Setzt die Anfangsposition, Größe und startet bei 0%.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Coins);
        this.setPercentage(0); // Start auf 0%
        this.x = 20;
        this.y = 90;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Setzt den Prozentwert der Münzanzeige und aktualisiert entsprechend das angezeigte Bild.
     * @param {number} percentage - Neuer Prozentsatz der gesammelten Münzen (0 - 100).
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Coins[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Ermittelt anhand des aktuellen Prozentwerts, welches Bild angezeigt werden soll.
     * @returns {number} Index des zu verwendenden Bildes aus dem Array {@link Images_Coins}.
     */
    resolveImageIndex() {
        if (this.percentage <= 0) {
            return 0;
        } else if (this.percentage <= 20) {
            return 1;
        } else if (this.percentage <= 40) {
            return 2;
        } else if (this.percentage <= 60) {
            return 3;
        } else if (this.percentage <= 80) {
            return 4;
        } else {
            return 5;
        }
    }
}
