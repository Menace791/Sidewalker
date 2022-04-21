let config = {
    type: Phaser.CANVAS,
    width: 100,
    height: 480,
    scene: [Play],
};

let keyLEFT, keyRIGHT;

let game = new Phaser.Game(config);