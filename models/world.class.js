/************************************************************
 * Repräsentiert die gesamte Spielwelt und koordiniert die 
 * einzelnen Spielfunktionen wie Zeichnen, Kollisionen, 
 * Wurfobjekte sowie Anzeigen für Lebens- und Flaschenstatus.
 ************************************************************/
class World {

    /**
     * Das Level, in dem sich die Spielwelt aktuell befindet.
     * @type {Level}
     */
    level = level1;

    /**
     * Der Charakter (Spieler) innerhalb der Welt.
     * @type {Character}
     */
    character = new Character();

    /**
     * Eine Statusanzeige für die Lebenspunkte des Charakters.
     * @type {StatusBar}
     */
    statusBar = new StatusBar();

    /**
     * Eine Statusanzeige für den Flaschenvorrat.
     * @type {BottleBar}
     */
    bottleBar = new BottleBar();

    /**
     * Eine Statusanzeige für den Endboss.
     * @type {EndbossBar}
     */
    endbossBar = new EndbossBar();

    /**
     * Eine Instanz des Endbosses.
     * @type {Endboss}
     */
    endboss = new Endboss();

    /**
     * Eine Anzeige für die gesammelten Münzen.
     * @type {CoinBar}
     */
    coinBar = new CoinBar();

    /**
     * Liste von Wurfobjekten (z.B. Flaschen), die sich aktuell 
     * im Spiel befinden.
     * @type {ThrowableObject[]}
     */
    throwableObjects = [];

    /**
     * Liste von beweglichen Objekten in der Welt (Charakter 
     * und Gegner).
     * @type {MoveableObject[]}
     */
    moveableObjects = [];

    /**
     * Flag, das angibt, ob das Spiel beendet ist (GameOver).
     * @type {boolean}
     */
    GameOver = false;

    /**
     * Der 2D-Rendering-Kontext des Canvas.
     * @type {CanvasRenderingContext2D}
     */
    ctx;

    /**
     * Referenz auf das Canvas-Element.
     * @type {HTMLCanvasElement}
     */
    canvas;

    /**
     * Referenz auf das Keyboard-Objekt, in dem die Tastendrücke 
     * gespeichert werden.
     * @type {Keyboard}
     */
    keyboard;

    /**
     * Bestimmt die Verschiebung der Kamera (für Parallax-Scrolling).
     * @type {number}
     */
    camera_x = 0;

    /**
     * Flag, das angibt, ob das Spiel gerade läuft.
     * @type {boolean}
     */
    gameRunning;

    /**
     * Erstellt eine Instanz der Welt, initialisiert den Zeichen-Kontext,
     * setzt den Charakter in Bezug zur Welt, startet den Zeichenloop (draw) 
     * und das Hauptspiel-Loop (run).
     * 
     * @param {HTMLCanvasElement} canvas - Das Canvas-Element, auf dem gezeichnet wird.
     * @param {Keyboard} keyboard - Das Objekt, das Tastatureingaben speichert.
     */
    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext("2d");
        this.canvas = canvas;
        this.keyboard = keyboard;

        // Verknüpft Charakter mit dessen Balken
        this.character.bottleBar = this.bottleBar;
        this.character.coinBar = this.coinBar;

        // Speichert alle beweglichen Objekte in einem Array (Charakter + Gegner)
        this.moveableObjects = [this.character, ...this.level.enemies];

        this.gameRunning = true;
        this.draw();
        this.setWorld();
        this.run();
    }

    /**
     * Stellt eine Referenz auf die Spielwelt im Charakter-Objekt bereit.
     */
    setWorld() {
        this.character.world = this;
    }

    /**
     * Führt in regelmäßigen Abständen verschiedene Überprüfungen durch:
     * - Kollisionen
     * - Wurfobjekte
     * - Aufnahme von Flaschen
     * - Aufnahme von Münzen
     * - Spielende
     */
    run() {
        setInterval(() => {
            this.checkCollisions();
            this.checkThrowObjects();
            this.checkBottles();
            this.checkCoins();
            this.checkGameOver();
        }, 200);
    }

    /**
     * Der kontinuierliche Zeichenloop, der mittels `requestAnimationFrame` 
     * immer wieder aufgerufen wird. Zeichnet alle Elemente auf dem Canvas 
     * (Hintergründe, Wolken, HUD, Charakter, Gegner, Wurfobjekte, etc.).
     */
    draw() {
        // Canvas löschen
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Kamera verschieben
        this.ctx.translate(this.camera_x, 0);

        // Zeichnet Hintergrundobjekte und Wolken
        this.addObjectsToMap(this.level.backgroundObjects);
        this.addObjectsToMap(this.level.clouds);

        // HUD im statischen Bereich zeichnen
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.bottleBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.endbossBar);

        // Kamera wieder verschieben
        this.ctx.translate(this.camera_x, 0);

        // Zeichnet Münzen, Wurfobjekte, Flaschen, Gegner
        this.addObjectsToMap(this.level.coins);
        this.addObjectsToMap(this.throwableObjects);
        this.addObjectsToMap(this.level.bottles);
        this.addObjectsToMap(this.level.enemies);

        // Zeichnet den Charakter
        this.addToMap(this.character);

        // Kamera zurücksetzen
        this.ctx.translate(-this.camera_x, 0);

        // Zeichnen in der nächsten Frame fortsetzen
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
     * Fügt mehrere Objekte in die Zeichenschleife ein.
     * 
     * @param {DrawableObject[]|MoveableObject[]} objects - Array von Objekten, die gezeichnet werden sollen.
     */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
     * Zeichnet ein einzelnes Objekt (inkl. Rahmen, wenn vorhanden) 
     * auf dem Canvas.
     * 
     * @param {DrawableObject|MoveableObject} mo - Das Objekt, das gezeichnet werden soll.
     */
    addToMap(mo) {
        // Falls Objekt nach links schaut (Spiegelung), Bild entsprechend drehen
        if (mo.otherDirection) {
            this.flipImage(mo);
        }

        mo.draw(this.ctx);

        // Nach dem Zeichnen Spiegelung rückgängig machen
        if (mo.otherDirection) {
            this.flipImageBack(mo);
        }
    }

    /**
     * Überprüft, ob der Spieler eine Flasche werfen möchte (Taste D) 
     * und ob noch genug Flaschen verfügbar sind. Erstellt eine neue 
     * geworfene Flasche und zieht eine Einheit vom Flaschenbalken ab.
     */
    checkThrowObjects() {
        if (this.keyboard.D && this.bottleBar.percentage > 0) {
            let bottle = new ThrowableObject(
                this.character.x + 40,
                this.character.y + 60,
                this.bottleBar,
                this.character.otherDirection ? 'LEFT' : 'RIGHT'
            );
            this.throwableObjects.push(bottle);
            this.bottleBar.setPercentage(Math.max(0, this.bottleBar.percentage - 20));
        }
    }

    /**
     * Überprüft Kollisionen zwischen dem Charakter und Gegnern sowie 
     * zwischen Wurfobjekten und Gegnern.
     */
    checkCollisions() {
        this.level.enemies.forEach(enemy => {
            // Kollision zwischen Charakter und Gegner
            if (this.character.isColliding(enemy)) {
                this.handleCharacterEnemyCollision(enemy);
            }
            
            // Kollision zwischen geworfener Flasche und Gegner
            this.throwableObjects.forEach(bottle => {
                if (bottle.isCollidingWithThrowableObject(enemy)) {
                    this.handleThrowableCollisionWithEnemy(enemy, bottle);
                }
            });
        });
    }

    /**
     * Verarbeitet die Kollision zwischen einem Wurfobjekt (Flasche) und einem Gegner.
     * 
     * @param {MoveableObject} enemy - Das getroffene Gegnerobjekt.
     * @param {ThrowableObject} bottle - Das Flaschenobjekt, das kollidiert ist.
     */
    handleThrowableCollisionWithEnemy(enemy, bottle) {
        if (enemy instanceof Endboss) {
            enemy.takeHitBoss();
            this.endbossBar.setPercentage(enemy.energy);
        } else {
            enemy.takeDamage();
        }
        bottle.playSplashAnimation();
    }

    /**
     * Verarbeitet die Kollision des Charakters mit einem Gegner (Huhn oder Endboss).
     * 
     * @param {MoveableObject} enemy - Der Gegner, mit dem der Charakter kollidiert ist.
     */
    handleCharacterEnemyCollision(enemy) {
        if ((enemy instanceof ChickenSmall || enemy instanceof Chicken) && !enemy.isDead()) {
            const isJumpingOnChicken = this.character.isCollidingJump(enemy);
            this.processCharacterCollision(isJumpingOnChicken, enemy);
        }
    }

    /**
     * Regelt das Verhalten, wenn der Charakter mit einem Huhn kollidiert:
     * - Ist der Charakter gerade im Sprung, nimmt das Huhn Schaden
     * - Andernfalls nimmt der Charakter Schaden
     * 
     * @param {boolean} isJumpingOnChicken - true, wenn Charakter Huhn von oben trifft.
     * @param {MoveableObject} enemy - Das kollidierte Huhn.
     */
    processCharacterCollision(isJumpingOnChicken, enemy) {
        if (isJumpingOnChicken) {
            enemy.takeDamage();
        } else {
            this.character.hit();
        }
    }

    /**
     * Überprüft, ob der Charakter mit einer Flasche kollidiert.
     * Wenn ja und die Flaschenanzeige nicht voll ist, wird eine Flasche 
     * aufgenommen und aus dem Level entfernt.
     */
    checkBottles() {
        this.level.bottles.forEach(bottle => {
            if (this.character.isColliding(bottle)) {
                if (this.character.bottleBar.percentage < 100) {
                    this.character.pickBottles();
                    this.level.bottles.splice(this.level.bottles.indexOf(bottle), 1);
                }
            }
        });
    }

    /**
     * Überprüft, ob der Charakter mit einer Münze kollidiert.
     * Wenn ja, nimmt der Charakter die Münze auf und sie wird 
     * aus dem Level entfernt.
     */
    checkCoins() {
        this.level.coins.forEach(coin => {
            if (this.character.isColliding(coin)) {
                this.character.pickCoins();
                this.level.coins.splice(this.level.coins.indexOf(coin), 1);
            }
        });
    }

    /**
     * Prüft, ob das Spiel zu Ende ist (GameOver), wenn der Charakter oder 
     * der Endboss stirbt. Wenn GameOver, wird das entsprechende Endbild 
     * angezeigt und die Bewegungen werden gestoppt.
     */
    checkGameOver() {
        if (this.GameOver) return;
        const endboss = this.level.enemies.find(enemy => enemy instanceof Endboss);
        const handleEnd = (condition, image) => {
            if (condition) {
                this.GameOver = true;
                image();
                this.character.stopMovement();
                if (endboss) endboss.stopMovementEndboss();
            }
        };
        // Spiel endet, wenn Charakter stirbt
        handleEnd(this.character.isDead(), this.showGameOverImage.bind(this));
        // Spiel endet, wenn Endboss stirbt
        handleEnd(endboss && endboss.isDead(), this.showWinImage.bind(this));
    }

    /**
     * Zeigt das Game-Over-Bild an und blendet den Startbildschirm aus.
     */
    showGameOverImage() {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("gameOverScreen").style.display = "block";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("menuButton").style.display = "block";
    }

    /**
     * Zeigt das Win-Bild an und blendet den Startbildschirm aus.
     */
    showWinImage() {
        document.getElementById("startScreen").style.display = "none";
        document.getElementById("winScreen").style.display = "block";
        document.getElementById("restartButton").style.display = "block";
        document.getElementById("menuButton").style.display = "block";
    }

    /**
     * Spiegelt das Bild horizontal auf der X-Achse, 
     * damit das Objekt nach links ausgerichtet erscheint.
     * 
     * @param {MoveableObject} mo - Das zu spiegelnde Objekt.
     */
    flipImage(mo) {
        this.ctx.save();
        this.ctx.translate(mo.width, 0);
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
     * Macht die Horizontalspiegelung wieder rückgängig.
     * 
     * @param {MoveableObject} mo - Das ursprünglich gespiegelte Objekt.
     */
    flipImageBack(mo) {
        mo.x = mo.x * -1;
        this.ctx.restore();
    }

    /**
     * Blendet das GameOver- und das Win-Screen sowie die Buttons aus.
     */
    hideStatusAndRestartButton() {
        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("winScreen").style.display = "none";
        document.getElementById("restartButton").style.display = "none";
        document.getElementById("menuButton").style.display = "none";
    }

    /**
     * Setzt die Spielwelt zurück, indem Charakter und Level 
     * zurückgesetzt und Wurfobjekte geleert werden. 
     * Zeigt zudem GUI-Elemente an/aus.
     */
    resetWorld() {
        world.hideStatusAndRestartButton();
        this.character.reset();
        this.level.reset();
        this.throwableObjects = [];
        this.gameRunning = true;
    }

 /**
 * Schaltet alle Sounds im gesamten Spiel an oder aus.
 * @param {boolean} enabled - true zum Aktivieren, false zum Deaktivieren.
 */
toggleSounds(enabled) {
    AudioManager.toggleSounds(enabled);
}
}
