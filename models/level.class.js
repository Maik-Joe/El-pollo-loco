class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;

    /**
     * Creates a new level instance with the specified elements.
     * @param {MoveableObject[]} enemies - The enemies in the level.
     * @param {MoveableObject[]} clouds - The clouds in the level.
     * @param {MoveableObject[]} bottles - The collectible bottles in the level.
     * @param {MoveableObject[]} coins - The collectible coins in the level.
     * @param {DrawableObject[]} backgroundObjects - The background objects in the level.
     */
    constructor(enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }

    /**
     * Resets all level elements by clearing their respective arrays.
     */
    reset() {
        this.enemies = [];
        this.clouds = [];
        this.backgroundObjects = [];
        this.bottles = [];
        this.coins = [];
    }
}
