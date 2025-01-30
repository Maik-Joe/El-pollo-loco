class BottleBar extends DrawableObject {
    
    Images_Bottles = [ 
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png',
        'img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png'
    ];

    percentage = 0;

    /**
     * Creates a new bottle bar.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Bottles);
        this.setPercentage(0);
        this.x = 20;
        this.y = 45;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Sets the fill level of the bottle bar.
     * @param {number} percentage - The new fill level in percentage.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Bottles[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the correct image index based on the current percentage.
     * @returns {number} The index of the image to use in Images_Bottles.
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