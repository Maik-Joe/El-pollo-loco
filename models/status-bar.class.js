class StatusBar extends DrawableObject {
    
    Images_Health = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png'
    ];

    percentage = 100;

    /**
     * Creates a new StatusBar instance, loads its images,
     * sets the initial percentage, and positions it on the screen.
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
     * Sets the current percentage of the health bar and updates the displayed image.
     * @param {number} percentage - A value between 0 and 100.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.Images_Health[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
}
