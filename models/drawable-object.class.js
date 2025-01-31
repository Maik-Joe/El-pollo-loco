class DrawableObject {

    img;
    x = 100;
    y = 230;
    height = 200;
    width = 120;
    imageCache = {};
    currentImage = 0;

    /**
     * Loads an image from the given path and assigns it to this instance.
     * @param {string} path - The path to the image file.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Loads multiple images and stores them in the image cache.
     * @param {string[]} arr - A list of image file paths.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Draws the object on the given canvas rendering context.
     * @param {CanvasRenderingContext2D} ctx - The canvas rendering context.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

  /**
     * Determines which image to display based on the current percentage.
     * This method applies to multiple instances and selects an image index 
     * according to the percentage value.
     * @memberof ParentClassName
     * @returns {number} The index of the image from {@link Images_}.
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
