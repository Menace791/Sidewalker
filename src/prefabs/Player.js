class Player extends Phaser.GameObjects.Sprite {

    constructor(scene, x, y, texture, frame) {
        super(scene, x, y, texture, frame);

        scene.add.existing(this);
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT) &&
           (this.centerLane(this) || this.rightLane(this))) {
               this.x -= 34;
        }
        if(Phaser.Input.Keyboard.JustDown(keyRIGHT) &&
           (this.leftLane(this) || this.centerLane(this))) {
               this.x += 34;
        }
    }

    leftLane(player) {
        if (player.x == 0) {
            return true;
        } else {
            return false;
        }
    }

    centerLane(player) {
        if (player.x == 34) {
            return true;
        } else {
            return false;
        }
    }

    rightLane(player) {
        if (player.x == 68) {
            return true;
        } else {
            return false;
        }
    }
}