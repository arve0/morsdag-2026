// Game constants
export const GAME_WIDTH = 864;
export const GAME_HEIGHT = 1184;

export const SHOP_IMAGE_WIDTH = 1024;
export const SHOP_IMAGE_HEIGHT = 768;

// Shop prices
export const SHOP_PRICES = {
    vannmelon: 50,
    blåbær: 10,
    jordbær: 50,
    bringebær: 20,
    kirsebær: 30,
    tyttebær: 10,
    bjornebær: 25
};

// Berry positions in shop image (x, y coordinates and size)
export const BERRY_POSITIONS = {
    vannmelon: { x: 370, y: 270, width: 120, height: 120 },
    blåbær: { x: 470, y: 290, width: 100, height: 100 },
    jordbær: { x: 570, y: 270, width: 150, height: 110 },
    bringebær: { x: 720, y: 270, width: 100, height: 100 },
    kirsebær: { x: 150, y: 260, width: 110, height: 110 },
    tyttebær: { x: 150, y: 450, width: 90, height: 90 },
    bjornebær: { x: 150, y: 570, width: 100, height: 100 }
};

// Start and finish areas (will be adjusted based on actual track image)
export const START_AREA = {
    x: Math.floor((GAME_WIDTH - 150) / 2),
    y: 90,
    width: 150,
    height: 100
};

export const FINISH_AREA = {
    x: Math.floor((GAME_WIDTH - 150) / 2),
    y: GAME_HEIGHT - 50,
    width: 150,
    height: 50
};

// Game settings
export const CAR_SPEED = 200;
export const CAR_ROTATION_SPEED = 150;
export const DOG_SPEED = 100;
export const WIN_REWARD = 100;
export const DOG_COLLISION_PENALTY = 20;
export const CAT_REWARD = 10;
