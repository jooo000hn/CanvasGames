﻿class PaintCan extends ColoredSprite {
    minSpeed: number;
    offsetY = -200;
    constructor(
        public offsetX: number,
        public targetColor: string) {
        super(
            {
                red: Game.images['can_red'],
                green: Game.images['can_green'],
                blue: Game.images['can_blue'],
            }, 'red');
        this.reset();
    }

    reset() {
        this.minSpeed = 30;
        this.restart();
    }

    restart() {
        this.position.set(this.offsetX, this.offsetY);
        this.velocity.set(0, this.minSpeed + Math.random() * 30);
        this.color = Object.keys(this.colors)[Math.floor(Math.random() * 3)];
        if (this.color == this.targetColor) {
            GameWorld.score += 10;
        }
    }

    update(frameSpan: number) {
        if (GameWorld.lives > 0) {
            if (this.collideWith(GameWorld.ball)) {
                this.color = GameWorld.ball.color;
                if (this.color == this.targetColor) {
                    GameWorld.score += 10;
                    Sound.Play(Game.audios['collect_points']);
                } else {
                    GameWorld.score -= 10;
                }
                GameWorld.ball.reset();
            }
            if (this.position.y > Game.viewport.height) {
                if (this.color != this.targetColor) {
                    GameWorld.lives -= 1;
                }
                this.restart();
            }
            this.rotation = Math.sin(this.position.y / 50) * 0.05;
            this.minSpeed += 0.02;
            super.update(frameSpan);
        }
    }
} 