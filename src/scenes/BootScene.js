import { GAME_WIDTH, GAME_HEIGHT } from '../data/constants.js';

export default class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Create loading text
        const loadingText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Laster...',
            {
                fontSize: '32px',
                fill: '#ffffff'
            }
        );
        loadingText.setOrigin(0.5);

        // Create progress bar
        const progressBar = this.add.graphics();
        const progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(
            this.cameras.main.centerX - 160,
            this.cameras.main.centerY + 50,
            320,
            50
        );

        this.load.on('progress', (value) => {
            progressBar.clear();
            progressBar.fillStyle(0x00ff00, 1);
            progressBar.fillRect(
                this.cameras.main.centerX - 150,
                this.cameras.main.centerY + 60,
                300 * value,
                30
            );
        });

        this.load.on('complete', () => {
            progressBar.destroy();
            progressBox.destroy();
            loadingText.destroy();
        });

        // Load images - with fallback handling
        this.load.on('loaderror', (file) => {
            console.warn(`Failed to load: ${file.key}`);
        });

        // Load game assets
        this.load.image('track', 'assets/bane.png');
        this.load.image('car', 'assets/bil.png');
        this.load.image('cat', 'assets/katt.png');
        this.load.image('dog', 'assets/hund.png');
        this.load.image('butikk', 'assets/butikk.png');

        // Load audio (with fallback handling)
        this.load.audio('bgMusic', 'assets/music.mp3');
        this.load.audio('dog', 'assets/dog.mp3');
        this.load.audio('purchase', 'assets/kjop.mp3');
        this.load.audio('win', 'assets/win.mp3');
        this.load.audio('fail', 'assets/fail.mp3');
        this.load.audio('cat', 'assets/cat.mp3');
    }

    create() {
        // Create fallback graphics for missing assets
        this.createFallbackAssets();

        // Start the game
        this.scene.start('GameScene');
        this.scene.launch('UIScene');
    }

    createFallbackAssets() {
        const textures = this.textures;

        // Create fallback track if missing
        if (!textures.exists('track')) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0x228B22, 1);
            graphics.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
            graphics.fillStyle(0x404040, 1);
            graphics.fillRect(150, 150, GAME_WIDTH - 300, GAME_HEIGHT - 300);
            graphics.generateTexture('track', GAME_WIDTH, GAME_HEIGHT);
            graphics.destroy();
        }

        // Create fallback car if missing
        if (!textures.exists('car')) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0xff0000, 1);
            graphics.fillRect(0, 0, 40, 60);
            graphics.fillStyle(0x0000ff, 1);
            graphics.fillRect(5, 5, 30, 20);
            graphics.generateTexture('car', 40, 60);
            graphics.destroy();
        }

        // Create fallback cat if missing
        if (!textures.exists('cat')) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0xff9900, 1);
            graphics.fillCircle(15, 15, 15);
            graphics.fillStyle(0x000000, 1);
            graphics.fillCircle(10, 12, 3);
            graphics.fillCircle(20, 12, 3);
            graphics.generateTexture('cat', 30, 30);
            graphics.destroy();
        }

        // Create fallback dog if missing
        if (!textures.exists('dog')) {
            const graphics = this.add.graphics();
            graphics.fillStyle(0x8B4513, 1);
            graphics.fillCircle(20, 20, 20);
            graphics.fillStyle(0x000000, 1);
            graphics.fillCircle(15, 17, 3);
            graphics.fillCircle(25, 17, 3);
            graphics.generateTexture('dog', 40, 40);
            graphics.destroy();
        }

        // Create fallback shop items
        const shopItems = ['vannmelon', 'blabaer', 'jordbaer', 'bringebaer', 'kirsebaer', 'tyttebaer', 'bjornebaer'];
        const colors = [0xFF69B4, 0x0000FF, 0xFF0000, 0xDC143C, 0x8B0000, 0xDC143C, 0x4B0082];

        shopItems.forEach((item, index) => {
            if (!textures.exists(item)) {
                const graphics = this.add.graphics();
                graphics.fillStyle(colors[index], 1);
                graphics.fillCircle(30, 30, 25);
                graphics.generateTexture(item, 60, 60);
                graphics.destroy();
            }
        });
    }
}
