class EndbossBar extends DrawableObject {


    Images_Health = [ 
        'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
        'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
    ];

    percentage = 100;
    energy = 100;

    constructor() {
        super();
        this.loadImages(this.Images_Health);
        this.setPercentage(100);
        this.x = 500;
        this.y = 5;
        this.width = 200;
        this.height = 50;
    }

    setPercentage(percentage) {
        percentage = Math.max(0, Math.min(100, percentage));
        let index = this.resolveImageIndex(percentage);
        let path = this.Images_Health[index]; 
        this.img = this.imageCache[path];
        }
    
    
    
    resolveImageIndex(percentage) {
        if (percentage == 100) {
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
    
    
    }};


