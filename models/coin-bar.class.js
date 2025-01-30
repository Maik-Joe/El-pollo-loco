class CoinBar extends DrawableObject {
    
    Images_Coins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
    ];

    percentage = 0;

    /**
     * Creates a new CoinBar, loads all relevant images, sets its initial position and size,
     * and starts at 0% progress.
     */
    constructor() {
        super();
        this.loadImages(this.Images_Coins);
        this.setPercentage(0);
        this.x = 20;
        this.y = 90;
        this.width = 200;
        this.height = 50;
    }

    /**
     * Sets the percentage value of collected coins and updates the displayed image accordingly.
     * @param {number} percentage - A new percentage value in the range of 0 to 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Coins[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
     * Determines the array index of the image to display based on the current percentage value.
     * @returns {number} The index of the image to use from the {@link Images_Coins} array.
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
