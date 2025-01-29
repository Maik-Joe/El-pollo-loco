/**************************************************************
 * Repräsentiert ein Level, das verschiedene Elemente wie Gegner, 
 * Wolken, Hintergrundobjekte, Flaschen und Münzen enthält.
 **************************************************************/
class Level {

    /**
     * Liste der Gegner im Level.
     * @type {MoveableObject[]}
     */
    enemies;

    /**
     * Liste der Wolken im Level.
     * @type {MoveableObject[]}
     */
    clouds;

    /**
     * Liste der Hintergrundobjekte.
     * @type {DrawableObject[]}
     */
    backgroundObjects;

    /**
     * Liste der Flaschen, die im Level verteilt sind.
     * @type {MoveableObject[]}
     */
    bottles;

    /**
     * Liste der Münzen, die im Level gesammelt werden können.
     * @type {MoveableObject[]}
     */
    coins;

    /**
     * Erzeugt eine neue Instanz eines Levels mit den angegebenen Elementen.
     * 
     * @param {MoveableObject[]} enemies - Die Gegner im Level.
     * @param {MoveableObject[]} clouds - Die Wolken im Level.
     * @param {MoveableObject[]} bottles - Die Flaschen, die eingesammelt werden können.
     * @param {MoveableObject[]} coins - Die Münzen, die eingesammelt werden können.
     * @param {DrawableObject[]} backgroundObjects - Die Objekte im Hintergrund.
     */
    constructor(enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }

    /**
     * Setzt alle Elemente des Levels zurück, indem die entsprechenden 
     * Arrays geleert werden.
     */
    reset() {
        this.enemies = [];
        this.clouds = [];
        this.backgroundObjects = [];
        this.bottles = [];
        this.coins = [];
    }
}
