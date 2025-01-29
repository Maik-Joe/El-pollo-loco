/**************************************************************
 * Eine Basisklasse, die Objekte definiert, die gezeichnet (draw)
 * und deren Bilder geladen werden können.
 **************************************************************/
class DrawableObject {

    /**
     * Bildobjekt, das für das Rendern des Objekts verwendet wird.
     * @type {HTMLImageElement}
     */
    img;

    /**
     * X-Position des Objekts auf dem Canvas.
     * @type {number}
     */
    x = 100;

    /**
     * Y-Position des Objekts auf dem Canvas.
     * @type {number}
     */
    y = 230;

    /**
     * Höhe des Objekts.
     * @type {number}
     */
    height = 200;

    /**
     * Breite des Objekts.
     * @type {number}
     */
    width = 120;

    /**
     * Ein Cache für bereits geladene Bilder. So wird vermieden, 
     * dass Bilder mehrmals im Speicher angelegt werden.
     * 
     * @type {Object.<string, HTMLImageElement>}
     */
    imageCache = {};

    /**
     * Index für das aktuell angezeigte Bild innerhalb eines Animationsarrays.
     * @type {number}
     */
    currentImage = 0;

    /**
     * Lädt ein Bild und speichert es in der Instanz.
     * @param {string} path - Der Pfad zum Bild.
     */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * Lädt mehrere Bilder und speichert sie im {@link imageCache}.
     * @param {string[]} arr - Eine Liste von Bildpfaden.
     */
    loadImages(arr) {
        arr.forEach((path) => {
            let img = new Image();
            img.src = path;
            this.imageCache[path] = img;
        });
    }

    /**
     * Zeichnet das Objekt auf das übergebene Canvas-Kontextobjekt.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der Canvas-Kontext, 
     * auf dem das Objekt gezeichnet wird.
     */
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * Zeichnet einen blauen Rahmen um das Objekt, 
     * wenn es sich um eine der spezifizierten Klassen handelt.
     * 
     * @param {CanvasRenderingContext2D} ctx - Der Canvas-Kontext, 
     * auf dem der Rahmen gezeichnet wird.
     */
    drawFrame(ctx) {
        // Überprüfung auf Klasseninstanzen, damit nur bestimmte Objekte einen Rahmen erhalten
        if (this instanceof Character || 
            this instanceof Chicken || 
            this instanceof ChickenSmall || 
            this instanceof Endboss || 
            this instanceof SalsaBottle || 
            this instanceof Coins) {
            ctx.beginPath();
            ctx.lineWidth = "3";
            ctx.strokeStyle = "blue";
            ctx.rect(this.x, this.y, this.width, this.height);
            ctx.stroke();
        }
    }
}
