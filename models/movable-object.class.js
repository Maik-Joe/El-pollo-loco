class MoveableObject {
    x = 100;
    y = 230;
    img;
    height = 200;
    width = 120;
    imageCache = [];

    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    loadImages(arr) {
        arr.forEach((path) => { 
        let img = new Image();
        img.src = path;
        this.imageCache[path] = img;
        });
    }

    moveRight() {
        console.log('Moving right');
    }

    moveLeft() {

    }
}