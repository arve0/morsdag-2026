import { START_AREA, FINISH_AREA, CAR_SPEED, CAR_ROTATION_SPEED, DOG_SPEED, WIN_REWARD, DOG_COLLISION_PENALTY } from '../data/constants.js';

export default class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.car = null;
        this.cursors = null;
        this.dogs = null;
        this.cats = null;
        this.startZone = null;
        this.finishZone = null;
        this.hasStarted = false;
        this.hasFinished = false;
        this.canMove = false;
        this.bgMusic = null;
        this.dogSound = null;
        this.winSound = null;
        this.catSound = null;
    }

    create() {
        // Reset game state for new round
        window.gameState.hasWon = false;
        window.gameState.hadCollision = false;
        window.gameState.catsCollected = 0;
        this.hasStarted = false;
        this.hasFinished = false;
        this.canMove = false;

        // Add track background first (not in container, always visible)
        const track = this.add.image(512, 384, 'track');

        // Create a container to hold game elements (initially hidden)
        this.gameContainer = this.add.container(0, 0);
        this.gameContainer.setAlpha(0);

        // Create start area with checkered flag pattern
        this.createStartArea();

        // Create finish area
        this.createFinishArea();

        // Create car
        this.car = this.physics.add.sprite(START_AREA.x + 75, START_AREA.y + 50, 'car');
        this.car.setScale(0.1);
        this.car.setCollideWorldBounds(true);
        this.car.setDrag(0); // Ingen drag for konstant fart
        this.car.setAngularDrag(0);
        this.car.setMaxVelocity(300);
        this.car.setAlpha(0);

        // Create groups for dogs and cats
        this.dogs = this.physics.add.group();
        this.cats = this.physics.add.group();

        // Store timer references (will start after welcome message)
        this.dogSpawnTimer = null;
        this.catSpawnTimer = null;

        // Setup collisions
        this.physics.add.overlap(this.car, this.dogs, this.hitDog, null, this);
        this.physics.add.overlap(this.car, this.cats, this.collectCat, null, this);

        // Setup controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = {
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D)
        };

        // Prepare audio (don't play yet)
        if (this.sound.get('bgMusic')) {
            this.bgMusic = this.sound.get('bgMusic');
        } else if (this.cache.audio.exists('bgMusic')) {
            try {
                this.bgMusic = this.sound.add('bgMusic', { loop: true, volume: 0.5 });
            } catch (e) {
                console.log('Failed to create background music:', e);
            }
        } else {
            console.log('Background music not loaded in cache');
        }

        try {
            this.dogSound = this.cache.audio.exists('dog') ?
                this.sound.add('dog', { volume: 3 }) : null;
            this.winSound = this.cache.audio.exists('win') ?
                this.sound.add('win', { volume: 5 }) : null;
            this.failSound = this.cache.audio.exists('fail') ?
                this.sound.add('fail', { volume: 0.8 }) : null;
            this.catSound = this.cache.audio.exists('cat') ?
                this.sound.add('cat', { volume: 0.7 }) : null;
        } catch (e) {
            console.log('Sound effects not available');
        }

        // Show game board (but don't start gameplay yet)
        this.showGameBoard();
    }

    showGameBoard() {
        // Fade in the game board
        this.tweens.add({
            targets: this.gameContainer,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        this.tweens.add({
            targets: this.car,
            alpha: 1,
            duration: 500,
            ease: 'Power2'
        });

        // Wait a bit to ensure UIScene is ready, then show message
        this.time.delayedCall(600, () => {
            const uiScene = this.scene.get('UIScene');
            if (uiScene) {
                // Pass callback to start game after message disappears
                uiScene.showMessage('Kjør til mål!\nUnngå hunder 🐕, samle katter 🐈', () => {
                    this.startGameplay();
                });
            } else {
                // Fallback if UIScene not found
                this.startGameplay();
            }
        });
    }

    startGameplay() {
        // Enable car movement
        this.canMove = true;
        this.spawnCat();
        this.spawnDog();
        this.spawnCat();
        this.spawnDog();

        // Start background music
        if (this.bgMusic && !this.bgMusic.isPlaying) {
            this.bgMusic.play();
        }

        // Start spawning dogs
        this.dogSpawnTimer = this.time.addEvent({
            delay: 3000,
            callback: this.spawnDog,
            callbackScope: this,
            loop: true
        });

        // Start spawning cats
        this.catSpawnTimer = this.time.addEvent({
            delay: 3000,
            callback: this.spawnCat,
            callbackScope: this,
            loop: true
        });
    }

    createStartArea() {
        const graphics = this.add.graphics();

        // Draw checkered pattern
        const squareSize = 25;
        for (let x = 0; x < START_AREA.width / squareSize; x++) {
            for (let y = 0; y < START_AREA.height / squareSize; y++) {
                if ((x + y) % 2 === 0) {
                    graphics.fillStyle(0xffffff, 1);
                } else {
                    graphics.fillStyle(0x000000, 1);
                }
                graphics.fillRect(
                    START_AREA.x + x * squareSize,
                    START_AREA.y + y * squareSize,
                    squareSize,
                    squareSize
                );
            }
        }

        // Add to container
        this.gameContainer.add(graphics);

        // Add START text
        const startText = this.add.text(START_AREA.x + 75, START_AREA.y - 30, 'START', {
            fontSize: '32px',
            fill: '#00ff00',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        this.gameContainer.add(startText);

        // Create physics zone for start
        this.startZone = this.add.zone(
            START_AREA.x + START_AREA.width / 2,
            START_AREA.y + START_AREA.height / 2,
            START_AREA.width,
            START_AREA.height
        );
        this.physics.world.enable(this.startZone);
    }

    createFinishArea() {
        const graphics = this.add.graphics();

        // Draw checkered pattern for finish
        const squareSize = 25;
        for (let x = 0; x < FINISH_AREA.width / squareSize; x++) {
            for (let y = 0; y < FINISH_AREA.height / squareSize; y++) {
                if ((x + y) % 2 === 0) {
                    graphics.fillStyle(0xffffff, 1);
                } else {
                    graphics.fillStyle(0x000000, 1);
                }
                graphics.fillRect(
                    FINISH_AREA.x + x * squareSize,
                    FINISH_AREA.y + y * squareSize,
                    squareSize,
                    squareSize
                );
            }
        }

        // Add to container
        this.gameContainer.add(graphics);

        // Add FINISH text
        const finishText = this.add.text(FINISH_AREA.x + 75, FINISH_AREA.y - 30, 'MÅL', {
            fontSize: '32px',
            fill: '#ff0000',
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 4
        }).setOrigin(0.5);
        this.gameContainer.add(finishText);

        // Create physics zone for finish
        this.finishZone = this.add.zone(
            FINISH_AREA.x + FINISH_AREA.width / 2,
            FINISH_AREA.y + FINISH_AREA.height / 2,
            FINISH_AREA.width,
            FINISH_AREA.height
        );
        this.physics.world.enable(this.finishZone);
    }

    spawnDog() {
        if (this.hasFinished) return;

        // Spawn on left side only
        const x = -20;
        const y = Phaser.Math.Between(200, 600);

        // Move horizontally to the right with max 10 degrees diagonal
        // 10 degrees = ~0.176 radians, tan(10°) ≈ 0.176
        const maxVerticalSpeed = DOG_SPEED * 0.176; // Max vertical component
        const velocityX = DOG_SPEED;
        const velocityY = Phaser.Math.Between(-maxVerticalSpeed, maxVerticalSpeed);

        const dog = this.dogs.create(x, y, 'dog');
        dog.setVelocity(velocityX, velocityY);
        dog.setScale(0.1);
    }

    spawnCat() {
        if (this.hasFinished) return;

        // Spawn in center area, from top to bottom
        const x = Phaser.Math.Between(362, 662);
        const y = Phaser.Math.Between(100, 700);

        const cat = this.cats.create(x, y, 'cat');
        cat.setScale(0.1);

        // Make cat jump
        this.tweens.add({
            targets: cat,
            y: y - 20,
            duration: 300,
            yoyo: true,
            repeat: -1
        });

        // Remove cat after 10 seconds
        this.time.delayedCall(10000, () => {
            if (cat && cat.active) {
                cat.destroy();
            }
        });
    }

    hitDog(car, dog) {
        this.dogSound.play();

        // Remove dog
        dog.destroy();

        // Deduct money
        window.gameState.money = Math.max(0, window.gameState.money - DOG_COLLISION_PENALTY);
        window.gameState.hadCollision = true;

        // Flash car red
        car.setTint(0xff0000);
        this.time.delayedCall(200, () => {
            car.clearTint();
        });

        // Stop car briefly
        car.setVelocity(0, 0);

        // Show message
        this.events.emit('showMessage', `Kræsj! -${DOG_COLLISION_PENALTY} kr`);
    }

    collectCat(car, cat) {
        // Play cat sound
        this.catSound.play();

        cat.destroy();
        window.gameState.catsCollected++;

        // Show floating text
        const text = this.add.text(cat.x, cat.y, '+1 katt', {
            fontSize: '20px',
            fill: '#ffff00',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        this.tweens.add({
            targets: text,
            y: cat.y - 50,
            alpha: 0,
            duration: 1000,
            onComplete: () => text.destroy()
        });
    }

    update() {
        if (this.hasFinished) return;

        // Car controls - konstant fart, sidelengs bevegelse
        const speed = 200;

        let velocityX = 0;
        let velocityY = 0;

        // Only allow movement if canMove is enabled
        if (this.canMove) {
            if (this.cursors.up.isDown || this.wasd.up.isDown) {
                velocityY = -speed;
            } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
                velocityY = speed;
            }

            if (this.cursors.left.isDown || this.wasd.left.isDown) {
                velocityX = -speed;
            } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
                velocityX = speed;
            }

            // Mark as started if any movement key is pressed
            if (velocityX !== 0 || velocityY !== 0) {
                this.hasStarted = true;
            }
        }

        // Sett hastighet direkte (konstant fart, ingen akselerasjon)
        this.car.setVelocity(velocityX, velocityY);
        // Ingen akselerasjonsrotasjon
        this.car.setAngularVelocity(0);

        // Snu bilen basert på retning
        if (velocityX !== 0 || velocityY !== 0) {
            // Beregn retning basert på hastighet
            const angle = Math.atan2(velocityY, velocityX);
            // Roter bilen - legg til 270 grader (180 grader mer enn før)
            this.car.rotation = angle - Math.PI / 2;
        }

        // Remove dogs that have passed the right side of screen
        this.dogs.getChildren().forEach(dog => {
            if (dog.x > 1044) {
                dog.destroy();
            }
        });

        // Check if reached finish
        if (this.hasStarted && !this.hasFinished) {
            const carBounds = this.car.getBounds();
            const finishBounds = this.finishZone.getBounds();

            if (Phaser.Geom.Intersects.RectangleToRectangle(carBounds, finishBounds)) {
                this.reachFinish();
            }
        }
    }

    reachFinish() {
        this.hasFinished = true;
        this.car.setVelocity(0, 0);
        this.car.setAcceleration(0);

        // Stop all dogs and cats
        this.dogs.getChildren().forEach(dog => {
            dog.setVelocity(0, 0);
        });
        this.cats.getChildren().forEach(cat => {
            cat.setVelocity(0, 0);
        });

        if (!window.gameState.hadCollision) {
            window.gameState.money += WIN_REWARD;
            window.gameState.hasWon = true;

            this.events.emit('showMessage', `Du vant! +${WIN_REWARD} kr`);
            this.winSound.play();
        } else {
            this.events.emit('showMessage', 'Du kom i mål, men hadde kræsj!');
            this.failSound.play();
        }

        // Show result screen after delay
        this.time.delayedCall(2000, () => {
            this.showResultScreen();
        });
    }

    showResultScreen() {
        // Create semi-transparent overlay
        const overlay = this.add.graphics();
        overlay.fillStyle(0x000000, 0.8);
        overlay.fillRect(0, 0, 1024, 768);
        overlay.setDepth(100);

        const centerX = 512;
        const centerY = 384;

        // Result text
        const resultText = window.gameState.hasWon ? 'DU VANT!' : 'FERDIG!';
        const resultColor = window.gameState.hasWon ? '#00ff00' : '#ffff00';

        this.add.text(centerX, centerY - 100, resultText, {
            fontSize: '64px',
            fill: resultColor,
            fontStyle: 'bold',
            stroke: '#000000',
            strokeThickness: 6
        }).setOrigin(0.5).setDepth(101);

        // Stats
        const statsText = `
Katter samlet: ${window.gameState.catsCollected}
Penger: ${window.gameState.money} kr
        `;

        this.add.text(centerX, centerY, statsText, {
            fontSize: '32px',
            fill: '#ffffff',
            align: 'center'
        }).setOrigin(0.5).setDepth(101);

        // Buttons
        const shopButton = this.add.text(centerX - 150, centerY + 120, '🛒 BUTIKK', {
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#0066cc',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(101).setInteractive();

        shopButton.on('pointerover', () => shopButton.setScale(1.1));
        shopButton.on('pointerout', () => shopButton.setScale(1));
        shopButton.on('pointerdown', () => {
            this.scene.pause('GameScene');
            this.scene.setVisible(false, 'UIScene');
            this.scene.pause('UIScene');
            this.scene.launch('ShopScene');
        });

        const playButton = this.add.text(centerX + 150, centerY + 120, '🏁 KJØR IGJEN', {
            fontSize: '28px',
            fill: '#ffffff',
            backgroundColor: '#00cc66',
            padding: { x: 20, y: 10 }
        }).setOrigin(0.5).setDepth(101).setInteractive();

        playButton.on('pointerover', () => playButton.setScale(1.1));
        playButton.on('pointerout', () => playButton.setScale(1));
        playButton.on('pointerdown', () => {
            this.scene.restart();
        });
    }

    shutdown() {
        // Clean up
        if (this.dogs) {
            this.dogs.clear(true, true);
        }
        if (this.cats) {
            this.cats.clear(true, true);
        }
    }
}
