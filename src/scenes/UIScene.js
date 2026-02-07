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
        moneyBg.fillRoundedRect(800, 10, 210, 60, 10);

        this.add.text(820, 20, '💰', {
            fontSize: '32px'
        });

        this.moneyText = this.add.text(870, 30, `${window.gameState.money} kr`, {
            fontSize: '28px',
            fill: '#ffff00',
            fontStyle: 'bold'
        });

        // Cat counter (top right, below money)
        const catBg = this.add.graphics();
        catBg.fillStyle(0x000000, 0.7);
        catBg.fillRoundedRect(800, 80, 210, 60, 10);

        this.add.text(820, 90, '🐱', {
            fontSize: '32px'
        });

        this.catText = this.add.text(870, 100, `${window.gameState.catsCollected}`, {
            fontSize: '28px',
            fill: '#ff9900',
            fontStyle: 'bold'
        });

        // Message text (midt på skjermen)
        this.messageText = this.add.text(512, 384, '', {
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
