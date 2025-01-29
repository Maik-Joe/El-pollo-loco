/**
 * Das erste Level des Spiels
 * @type {Level}
 */
let level1;

/**
 * Initialisiert das Level, indem es Gegner, Wolken, Items und den Hintergrund hinzufügt.
 */
function initLevel() {
    level1 = new Level(
        /**
         * Gegner im Level
         * @type {Array<Enemy>}
         */
        [
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new ChickenSmall(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Chicken(),
            new Endboss()
        ],
        /**
         * Wolken im Level
         * @type {Array<Cloud>}
         */
        [
            new Cloud('img/5_background/layers/4_clouds/1.png'),
            new Cloud('img/5_background/layers/4_clouds/2.png'),
            new Cloud('img/5_background/layers/4_clouds/1.png'),
            new Cloud('img/5_background/layers/4_clouds/2.png'),
            new Cloud('img/5_background/layers/4_clouds/1.png'),
            new Cloud('img/5_background/layers/4_clouds/2.png'),
            new Cloud('img/5_background/layers/4_clouds/1.png'),
            new Cloud('img/5_background/layers/4_clouds/2.png'),
        ],
        /**
         * Gegenstände im Level (Salsa-Flaschen)
         * @type {Array<SalsaBottle>}
         */
        [
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle(),
            new SalsaBottle()
        ],
        /**
         * Münzen im Level
         * @type {Array<Coins>}
         */
        [
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins(),
            new Coins()
        ],
        /**
         * Hintergrundobjekte im Level
         * @type {Array<BackgroundObject>}
         */
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),
        ]
    );
}