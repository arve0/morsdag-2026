import { GAME_WIDTH, GAME_HEIGHT } from '../data/constants.js';

export default class UIScene extends Phaser.Scene {
    constructor() {
        super({ key: 'UIScene' });
        this.moneyText = null;
        this.catText = null;
        this.messageText = null;
        this.messageTimer = null;
    }

    create() {
        // Money display (top right)
        const moneyBg = this.add.graphics();
        moneyBg.fillStyle(0x000000, 0.7);
        const moneyBgX = GAME_WIDTH - 230;
        moneyBg.fillRoundedRect(moneyBgX, 20, 210, 60, 10);

        this.add.text(moneyBgX + 20, 30, '💰', {
            fontSize: '32px'
        });

        this.moneyText = this.add.text(moneyBgX + 70, 40, `${window.gameState.money} kr`, {
            fontSize: '28px',
            fill: '#ffff00',
            fontStyle: 'bold'
        });

        // Cat counter (top right, below money)
        const catBg = this.add.graphics();
        catBg.fillStyle(0x000000, 0.7);
        const catBgX = GAME_WIDTH - 230;
        catBg.fillRoundedRect(catBgX, 90, 210, 60, 10);

        this.add.text(catBgX + 20, 100, '🐱', {
            fontSize: '32px'
        });

        this.catText = this.add.text(catBgX + 70, 110, `${window.gameState.catsCollected}`, {
            fontSize: '28px',
            fill: '#ff9900',
            fontStyle: 'bold'
        });

        // Message text (midt på skjermen)
        this.messageText = this.add.text(GAME_WIDTH / 2, GAME_HEIGHT / 2, '', {
            fontSize: '40px',
            fill: '#ffffff',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 5,
            align: 'center',
            backgroundColor: '#000000aa',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setAlpha(0);

        // Listen to GameScene events
        const gameScene = this.scene.get('GameScene');
        if (gameScene) {
            gameScene.events.on('showMessage', this.showMessage, this);
        }

        // Update UI every frame
        this.events.on('update', this.update, this);
    }

    update() {
        // Update money and cat displays
        if (this.moneyText) {
            this.moneyText.setText(`${window.gameState.money} kr`);
        }
        if (this.catText) {
            this.catText.setText(`${window.gameState.catsCollected}`);
        }
    }

    showMessage(text, callback) {
        // Clear existing message timer
        if (this.messageTimer) {
            this.messageTimer.remove();
        }

        // Show new message
        this.messageText.setText(text);
        this.messageText.setAlpha(1);

        // Fade out after 3 seconds
        this.messageTimer = this.time.delayedCall(3000, () => {
            this.tweens.add({
                targets: this.messageText,
                alpha: 0,
                duration: 500,
                onComplete: () => {
                    if (callback) {
                        callback();
                    }
                }
            });
        });
    }

    shutdown() {
        const gameScene = this.scene.get('GameScene');
        if (gameScene) {
            gameScene.events.off('showMessage', this.showMessage, this);
        }
    }
}
