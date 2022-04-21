class Walker extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
        this.moveSpeed = 2;
    }

    update() {
        this.y += this.moveSpeed;
        if (this.y > game.config.height) {
            this.destroy();
        }
    }
}