/**
 * Repräsentiert die Flaschenanzeige im Spiel.
 * Erweitert die Klasse DrawableObject.
 */
class BottleBar extends DrawableObject {
    
    /**
     * Bildpfade für die verschiedenen Füllstände der Flaschenanzeige
     * @type {string[]}
     */
    Images_Bottles = [ 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    /**
     * Der aktuelle Füllstand der Flaschenanzeige in Prozent.
     * @type {number}
     */
    percentage = 0; // Startwert für die Flaschenenergie

    /**
     * Erstellt eine neue Flaschenanzeige.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Bottles);
        this.setPercentage(0); // Start auf 0%
        this.x = 20;
        this.y = 45;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Setzt den Füllstand der Flaschenanzeige.
     * @param {number} percentage - Der neue Füllstand in Prozent.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Bottles[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Bestimmt das Bild für den aktuellen Füllstand.
     * @returns {number} Der Index des zu verwendenden Bildes in Images_Bottles.
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
            return 5; // 100% Flaschenenergie
        }
    }
}
