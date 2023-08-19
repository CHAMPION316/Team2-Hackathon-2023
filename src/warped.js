
import { SCALE } from './game';
import { player } from './player';

loadSpriteAtlas("/assets/tiles/warped.png", {
    ////////// pillars
    "pillar-l": {
        x: 16, y: 16, width: 16, height: 48
    },
    "pillar-r": {
        x: 112, y: 16, width: 16, height: 48
    },

    ////////// Walls
    "thin-wall-t": {
        x: 192, y: 16, width: 16, height: 16
    },
    "thin-wall-m":{
        x: 192, y: 32, width: 16, height: 32,
        sliceY: 2
    },
    "thin-wall-b": {
        x: 192, y: 64, width: 16, height: 16
    },

    ////////// Windows
    "window-o": {
        x: 224, y: 176, width: 48, height: 64
    },
    "window-h": {
        x: 224, y: 96, width: 48, height: 64
    },
    "window-c": {
        x: 224, y: 16, width: 48, height: 64
    },
    "thin-window-t": {
        x: 48, y: 16, width: 48, height: 16
    },
    "thin-window": {
        x: 48, y: 32, width: 48, height: 48
    },

    ////////// Aircon
    "aircon": {
        x: 176, y: 144, width: 32, height: 32
    },

    'dark': {
        x: 64, y: 16, width: 16, height: 16
    },

    ////////// Ladder
    "ladder": { 
        x: 32, y: 96, width: 16, height: 16 
    },
    "ladder-b": { 
        x: 32, y: 112, width: 16, height: 16 
    },

    ////////// Platforms
    "platform-l": {
        x: 96, y: 176, width: 16, height: 16
    },
    "platform-m": {
        x: 112, y: 176, width: 32, height: 16,
        sliceX: 2,
    },
    "platform-r": {
        x: 144, y: 176, width: 16, height: 16
    },
    "platform": {
        x: 336, y: 16, width: 16, height: 16
    }
});


export const backgroundTiles = {
    // Background pillars
    "[": () => [
        sprite("pillar-l"),
        scale(SCALE),
    ],
    "]": () => [
        sprite("pillar-r"),
        scale(SCALE),
    ],
    // Wall thin
    "┬": () => [
        sprite("thin-wall-t"),
        scale(SCALE),
    ],
    "│": () => [
        sprite("thin-wall-m", { frame: ~~rand(0, 2) }),
        scale(SCALE),
    ],
    "┴": () => [
        sprite("thin-wall-b"),
        scale(SCALE),
    ],
    // Windows
    '░': () => [
        sprite("window-o"),
        scale(SCALE),
    ],
    '▒': () => [
        sprite("window-h"),
        scale(SCALE),
    ],
    '▓': () => [
        sprite("window-c"),
        scale(SCALE),
    ],
    '▄':() => [
        sprite("thin-window-t"),
        scale(SCALE),
    ],
    '█': () => [
        sprite("thin-window"),
        scale(SCALE),
    ],

    // Aircon
    '+': () => [
        sprite("aircon"),
        scale(SCALE),
    ],
    // Dark tile
    '#': () => [
        sprite("dark"),
        scale(SCALE),
    ],
}

export const entities = {
    'P': player,
}

export const tiles = {
    // Ladders
    '≡': () => [
        sprite("ladder"),
        scale(SCALE),
        area({
            scale:vec2(0.1,1),
            offset:vec2(16*4,0)
        }),
        tile({ isObstacle: false }),
        'ladder'
    ],
    '¯': () => [
        sprite("ladder-b"),
        scale(SCALE),
        area({
            scale:vec2(0.1,1),
            offset:vec2(16*4,0)
        }),
        tile({ isObstacle: false }),
        'ladder'
    ],
    // platform Left end
    "<": () => [
        sprite("platform-l"),
        scale(SCALE),
        'platform',
    ],
    // Platform Middle
    "=": () => [
        sprite("platform-m", { frame: ~~rand(0, 2) }),
        area({scale:vec2(1, 0.25)}),
        scale(SCALE),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
        'platform',
    ],
    // Platform Right end
    ">": () => [
        sprite("platform-r"),
        scale(SCALE),
        'platform',
    ],
    // Ground
    "_": () => [
        sprite("platform"),
        scale(SCALE),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
        'ground'
    ] 
};