import { SHOP_PRICES, BERRY_POSITIONS } from '../data/constants.js';

export default class ShopScene extends Phaser.Scene {
    constructor() {
        super({ key: 'ShopScene' });
        this.purchaseSound = null;
        this.items = [];
    }

    create() {
        // Shop background image
        const shopBg = this.add.image(512, 384, 'butikk');
        shopBg.setDisplaySize(1024, 768);

        // Title
        this.add.text(512, 50, '🛒 BUTIKKEN', {
            fontSize: '48px',
            fill: '#000000',
            fontStyle: 'bold',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Money display
        const moneyBg = this.add.graphics();
        moneyBg.fillStyle(0x000000, 0.8);
        moneyBg.fillRoundedRect(800, 10, 210, 60, 10);

        this.add.text(820, 20, '💰', {
            fontSize: '32px'
        });

        this.moneyText = this.add.text(870, 30, `${window.gameState.money} kr`, {
            fontSize: '28px',
            fill: '#ffff00',
            fontStyle: 'bold'
        });

        // Create clickable berry areas on the shop image
        const itemNames = Object.keys(SHOP_PRICES);
        itemNames.forEach((itemName) => {
            if (BERRY_POSITIONS[itemName]) {
                this.createBerryArea(
                    BERRY_POSITIONS[itemName].x,
                    BERRY_POSITIONS[itemName].y,
                    BERRY_POSITIONS[itemName].width,
                    BERRY_POSITIONS[itemName].height,
                    itemName,
                    SHOP_PRICES[itemName]
                );
            }
        });

        // Back button
        const backButton = this.add.text(512, 700, '← Tilbake til spill', {
            fontSize: '32px',
            fill: '#ffffff',
            backgroundColor: '#666666',
            padding: { x: 30, y: 15 }
        }).setOrigin(0.5).setInteractive();

        backButton.on('pointerover', () => backButton.setScale(1.1));
        backButton.on('pointerout', () => backButton.setScale(1));
        backButton.on('pointerdown', () => {
            this.scene.stop('ShopScene');
            this.scene.resume('GameScene');
            this.scene.setVisible(true, 'UIScene');
            this.scene.resume('UIScene');
        });

        this.purchaseSound = this.cache.audio.exists('purchase') ?
            this.sound.add('purchase', { volume: 0.7 }) : null;

        // Play background music if not already playing
        try {
            const bgMusic = this.sound.get('bgMusic');
            if (bgMusic && !bgMusic.isPlaying) {
                bgMusic.play();
            }
        } catch (e) {
            console.log('Background music not available');
        }
    }

    createBerryArea(x, y, width, height, itemName, price) {
        // Create invisible interactive zone over berry location
        const zone = this.add.zone(x + width/2, y + height/2, width, height);
        zone.setInteractive();

        // Highlight overlay (shown on hover)
        const highlight = this.add.graphics();
        highlight.fillStyle(0xffff00, 0.3);
        highlight.fillRoundedRect(x, y, width, height, 10);
        highlight.lineStyle(3, 0xffff00, 1);
        highlight.strokeRoundedRect(x, y, width, height, 10);
        highlight.setAlpha(0);

        // Price tag
        const priceTag = this.add.graphics();
        priceTag.fillStyle(0x000000, 0.8);
        priceTag.fillRoundedRect(x, y + height - 35, 80, 35, 5);
        const priceText = this.add.text(x + 40, y + height - 17, `${price} kr`, {
            fontSize: '18px',
            fill: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Money icon for animation
        const moneyIcon = this.add.text(x + width/2, y, '💰', {
            fontSize: '32px'
        }).setOrigin(0.5).setAlpha(0);
        moneyIcon.originalPosition = { x: moneyIcon.x, y: moneyIcon.y };

        // Hover effects
        zone.on('pointerover', () => {
            highlight.setAlpha(1);
            priceTag.clear();
            priceTag.fillStyle(0xffff00, 1);
            priceTag.fillRoundedRect(x, y + height - 35, 80, 35, 5);
            priceText.setFill('#000000');
        });

        zone.on('pointerout', () => {
            highlight.setAlpha(0);
            priceTag.clear();
            priceTag.fillStyle(0x000000, 0.8);
            priceTag.fillRoundedRect(x, y + height - 35, 80, 35, 5);
            priceText.setFill('#ffff00');
        });

        zone.on('pointerdown', () => {
            this.purchaseItem(itemName, price, moneyIcon);
        });

        this.items.push({ zone, itemName, price, highlight, priceTag, priceText, moneyIcon });
    }

    purchaseItem(itemName, price, moneyIcon) {
        if (window.gameState.money >= price) {
            // Deduct money
            window.gameState.money -= price;

            // Play purchase sound
            if (this.purchaseSound) {
                this.purchaseSound.play();
            }

            // Animate money flying to top
            moneyIcon.setY(moneyIcon.originalPosition.y);
            moneyIcon.setX(moneyIcon.originalPosition.x);
            moneyIcon.setAlpha(1);

            // if tween is already running, stop it before starting a new one
            this.tweens.killTweensOf(moneyIcon);

            this.tweens.add({
                targets: moneyIcon,
                y: 160,
                x: 150,
                alpha: 0,
                duration: 1000,
                ease: 'Power2'
            });

            // Show purchase message
            const purchaseText = this.add.text(512, 150, `Kjøpte ${itemName}! -${price} kr`, {
                fontSize: '28px',
                fill: '#00ff00',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            this.tweens.add({
                targets: purchaseText,
                alpha: 0,
                duration: 2000,
                delay: 1000,
                onComplete: () => purchaseText.destroy()
            });

            // Update money display with animation
            this.tweens.killTweensOf(this.moneyText);
            this.moneyText.setScale(1);

            this.tweens.add({
                targets: this.moneyText,
                scaleX: 1.2,
                scaleY: 1.2,
                duration: 200,
                yoyo: true
            });

            // then update money text after animation
            this.time.delayedCall(400, () => {
                this.moneyText.setText(`${window.gameState.money} kr`);
            });

        } else {
            // Not enough money
            const errorText = this.add.text(512, 150, 'Ikke nok penger!', {
                fontSize: '32px',
                fill: '#ff0000',
                fontStyle: 'bold',
                stroke: '#000000',
                strokeThickness: 4
            }).setOrigin(0.5);

            this.tweens.add({
                targets: errorText,
                alpha: 0,
                duration: 2000,
                delay: 1000,
                onComplete: () => errorText.destroy()
            });

            // Shake money display
            this.tweens.add({
                targets: this.moneyText,
                x: this.moneyText.x + 10,
                duration: 50,
                yoyo: true,
                repeat: 5
            });
        }
    }

    update() {
        // Update money display
        // if (this.moneyText) {
        //     this.moneyText.setText(`${window.gameState.money} kr`);
        // }
    }
}
