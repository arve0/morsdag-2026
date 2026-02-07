import { GAME_WIDTH, GAME_HEIGHT } from './data/constants.js';
import BootScene from './scenes/BootScene.js';
import GameScene from './scenes/GameScene.js';
import ShopScene from './scenes/ShopScene.js';
import UIScene from './scenes/UIScene.js';

const config = {
    type: Phaser.AUTO,
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    parent: 'game-container',
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    scene: [BootScene, GameScene, ShopScene, UIScene]
};

const game = new Phaser.Game(config);

// Load saved money from localStorage
const savedMoney = localStorage.getItem('gameStateMoney');
const initialMoney = savedMoney !== null ? parseInt(savedMoney, 10) : 0;

// Global game state
window.gameState = {
    money: initialMoney,
    catsCollected: 0,
    hasWon: false,
    hadCollision: false
};

// Save money to localStorage whenever it changes
window.saveGameMoney = function() {
    localStorage.setItem('gameStateMoney', window.gameState.money.toString());
};
