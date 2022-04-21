class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    // preload assets
    preload() {
        this.load.image('sidewalk', 'assets/sidewalk.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('walker', 'assets/walker.png');
    }

    create() {

        // movement keys
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        // background sprite
        this.sidewalk = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sidewalk').setOrigin(0,0);

        // player sprite
        this.player = new Player(this, game.config.width / 2 - 16, game.config.height - 64, 'player').setOrigin(0,0);

        // container of enemies
        this.walkers = [];

        // send first two enemies immediately
        this.walkers.push(new Walker(this, 0, -32, 'walker').setOrigin(0,0));
        this.walkers.push(new Walker(this, 68, -32, 'walker').setOrigin(0,0));

        this.gameOver = false;

        // milliseconds between spawns
        this.spawnRate = 1000;

        // milliseconds passed since last spawn
        this.spawnTimer = 0;
    }

    // need timer as an argument to get access to delta
    // since delta is the second argumnt
    update(timer, delta) {

        // delta is innate Phaser thing that counts milliseconds between updates
        this.spawnTimer += delta;

        // once spawn reached, spawn in enemies and reset timer
        if(this.spawnTimer >= this.spawnRate) {
            this.walkerRespawn();
            this.spawnTimer = 0;
        }

        // iterate through enemy container and update everything
        if(!this.gameOver) {
            this.player.update();
            for (let i = 0; i < this.walkers.length; i++) {
                this.walkers[i].update();
            }
        }

        // iterate through enemy container to check for collisions and, if so, death
        for(let i = 0; i < this.walkers.length; i++) {
            if(this.checkCollision(this.player, this.walkers[i])) {
                this.player.destroy();
                this.gameOver = true;
            }
        }
    }

    // basic collision checker
    checkCollision(player, walker) {
        if (player.x < walker.x + walker.width &&
            player.x + player.width > walker.x &&
            player.y < walker.y + walker.height &&
            player.height + player.y > walker.y) {
                return true;
        } else {
            return false;
        }
    }

    // respawns enemies
    walkerRespawn(walkerL, walkerC, walkerR) {
        
        // determines which of 3 patterns will be chosen
        this.whichOne = Math.round(Math.random() * 2);

        // determines whether to send 1 or 2 enemies
        if (Math.round(Math.random())) {

            // 3 patterns of sending 2 enemies
            if (this.whichOne == 0) {
                this.walkers.push(new Walker(this, 0, -32, 'walker').setOrigin(0,0));
                this.walkers.push(new Walker(this, 34, -32, 'walker').setOrigin(0,0));
            } else if (this.whichOne == 1) {
                this.walkers.push(new Walker(this, 34, -32, 'walker').setOrigin(0,0));
                this.walkers.push(new Walker(this, 68, -32, 'walker').setOrigin(0,0));
            } else {
                this.walkers.push(new Walker(this, 0, -32, 'walker').setOrigin(0,0));
                this.walkers.push(new Walker(this, 68, -32, 'walker').setOrigin(0,0));
            }
        } else {

            // 3 patterns of sending 1 enemy
            if (this.whichOne == 0) {
                this.walkers.push(new Walker(this, 0, -32, 'walker').setOrigin(0,0));
            } else if (this.whichOne == 1) {
                this.walkers.push(new Walker(this, 34, -32, 'walker').setOrigin(0,0));
            } else {
                this.walkers.push(new Walker(this, 68, -32, 'walker').setOrigin(0,0));
            }
        }
    }
}