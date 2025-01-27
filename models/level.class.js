class Level {
    enemies;
    clouds;
    backgroundObjects;
    bottles;
    coins;

    constructor(enemies, clouds, bottles, coins, backgroundObjects) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.bottles = bottles;
        this.coins = coins;
    }

    reset() {
        this.enemies = [];  
        this.clouds = [];   
        this.backgroundObjects = [];  
        this.bottles = [];  
        this.coins = [];    
    }
}
