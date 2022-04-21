class Play extends Phaser.Scene {
    constructor() {
        super("play");
    }

    preload() {
        this.load.image('sidewalk', 'assets/sidewalk.png');
        this.load.image('player', 'assets/player.png');
        this.load.image('walker', 'assets/walker.png');
    }

    create() {

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        this.sidewalk = this.add.tileSprite(0, 0, game.config.width, game.config.height, 'sidewalk').setOrigin(0,0);

        this.player = new Player(this, game.config.width / 2 - 16, game.config.height - 64, 'player').setOrigin(0,0);

        this.walkers = [];
        this.walkers.push(new Walker(this, 0, -32, 'walker').setOrigin(0,0));
        this.walkers.push(new Walker(this, 68, -32, 'walker').setOrigin(0,0));

        this.gameOver = false;
        this.spawnRate = 1000;
        this.spawnTimer = 0;
    }

    update(timer, delta) {

        this.spawnTimer += delta;

        if(this.spawnTimer >= this.spawnRate) {
            this.walkerRespawn();
            this.spawnTimer = 0;
        }

        if(!this.gameOver) {
            this.player.update();
            for (let i = 0; i < this.walkers.length; i++) {
                this.walkers[i].update();
            }
        }

        for(let i = 0; i < this.walkers.length; i++) {
            if(this.checkCollision(this.player, this.walkers[i])) {
                this.player.destroy();
                this.gameOver = true;
            }
        }
    }

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

    walkerRespawn(walkerL, walkerC, walkerR) {
        this.whichOne = Math.round(Math.random() * 2);
        if (this.yesOrNo()) {
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
            if (this.whichOne == 0) {
                this.walkers.push(new Walker(this, 0, -32, 'walker').setOrigin(0,0));
            } else if (this.whichOne == 1) {
                this.walkers.push(new Walker(this, 34, -32, 'walker').setOrigin(0,0));
            } else {
                this.walkers.push(new Walker(this, 68, -32, 'walker').setOrigin(0,0));
            }
        }
    }

    yesOrNo() {
        if (Math.round(Math.random()) == 0) {
            return false;
        } else {
            return true;
        }
    }
}