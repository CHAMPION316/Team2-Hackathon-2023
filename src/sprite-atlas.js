
import { SCALE } from './game';
import { player } from './player';
import { greenGuy } from './enemy';

////////// Tile Set
loadSpriteAtlas("/assets/tiles/warped.png", {
    "blank": {
        x: 0, y: 0, width: 16, height: 16
    },
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

    "wall-lt": {
        x: 144, y: 16, width: 32, height: 16
    },
    "wall-lm": {
        x: 144, y: 32, width: 32, height: 32,
        sliceY: 2
    },
    "wall-lb": {
        x: 144, y: 64, width: 32, height: 16
    },
    "wall-rt": {
        x: 288, y: 16, width: 32, height: 16
    },
    "wall-rm": {
        x: 288, y: 32, width: 32, height: 32,
        sliceY: 2
    },
    "wall-rb": {
        x: 288, y: 64, width: 32, height: 16
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

    ////////// Misc
    "aircon": {
        x: 176, y: 144, width: 32, height: 32
    },

    'dark': {
        x: 64, y: 16, width: 16, height: 16
    },

    "pipes-1": {
        x: 160, y: 96, width: 48, height: 32,
    },
    "pipes-2-t": {
        x: 64, y: 96, width: 16, height: 16
    },
    "pipes-2-m": {
        x: 64, y: 112, width: 16, height: 16
    },
    "pipes-2-b": {
        x: 64, y: 128, width: 16, height: 16
    },

    "pipes-3": {
        x: 352, y: 96, width: 16, height: 32
    },

    "wires": {
        x: 64, y: 160, width: 16, height: 32,
        sliceY: 2
    },

    "vent": {
        x: 288, y: 96, width: 16, height: 32
    },

    "small-screen": {
        x: 320, y: 96, width: 16, height: 16
    },

    "thing": {
        x: 320, y: 112, width: 16, height: 16
    },

    "rail": {
        x:112, y: 96, width: 32, height: 64,
        sliceX: 2
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

const propAnim = (frames, speed) => ({
    sliceX: frames, sliceY: 1, anims: {
        idle: {
            from: 0, to: frames-1,
            speed, loop: true
        }
    }
});

////////// Props - static
loadSprite('antenna', '/assets/props/antenna.png');
loadSprite('banner-arrow', '/assets/props/banner-arrow.png');
loadSprite('banner-floor', '/assets/props/banner-floor.png');
loadSprite('banner-open', '/assets/props/banner-open.png');
loadSprite('banner-small', '/assets/props/banner-small.png');
loadSprite('banners', '/assets/props/banners.png');
loadSprite('control-box-1', '/assets/props/control-box-1.png');
loadSprite('control-box-2', '/assets/props/control-box-2.png');
loadSprite('control-box-3', '/assets/props/control-box-3.png');
loadSprite('hotel-sign', '/assets/props/hotel-sign.png');
////////// Props - animated
loadSprite('banner-big', '/assets/props/banner-big.png', 
    propAnim(4, 8)
);
loadSprite('banner-coke', '/assets/props/banner-coke.png',
    propAnim(3, 5)
);
loadSprite('banner-neon', 'assets/props/banner-neon.png',
    propAnim(4, 5)
);
loadSprite('banner-scroll', 'assets/props/banner-scroll.png',
    propAnim(4, 25)
);
loadSprite('banner-side', 'assets/props/banner-side.png',
    propAnim(4, 10)
);
loadSprite('banner-sushi', 'assets/props/banner-sushi.png',
    propAnim(3, 5)
);
loadSprite('monitor-face', 'assets/props/monitorface.png',
    propAnim(4, 5)
);

////////// Background
loadSprite('skyline', 'assets/background/skyline.png', {
    sliceX: 2, sliceY: 1
});


const decoration = (spriteKey, frames=false) => {
    return () => [
        sprite(
            spriteKey, 
            frames ? {frame: Math.floor(rand(0, frames))} : undefined
        ),
        scale(SCALE),
    ];
}

const prop = (spriteKey, anim=true, pos='topleft') => () => [
    sprite(spriteKey, anim?{ anim: 'idle' }:undefined),
    scale(SCALE),
    anchor(pos)
];

export const props = {
    // Animated props
    'B': prop('banner-big'),
    'c': prop('banner-coke'),
    'n': prop('banner-neon'),
    's': prop('banner-scroll'),
    'd': prop('banner-side'),
    'f': prop('banner-sushi'),
    'm': prop('monitor-face'),
    // Static props
    '0': prop('hotel-sign', false, 'bot'),
    '1': prop('antenna', false),
    '2': prop('banner-arrow', false),
    '3': prop('banner-floor', false),
    '4': prop('banner-open', false),
    '5': prop('banner-small', false),
    '6': prop('banners', false),
    '7': prop('control-box-1', false, 'bot'),
    '8': prop('control-box-2', false, 'bot'),
    '9': prop('control-box-3', false, 'bot'),
}

export const backgroundTiles = {
    // Ledge
    '_': decoration("platform"),
    // Background pillars
    "[": decoration("pillar-l"),
    "]": decoration("pillar-r"),
    // Wall thin
    "┬": decoration("thin-wall-t"),
    "│": decoration("thin-wall-m", 2),
    "┴": decoration("thin-wall-b"),
    // Thick walls
    '╔': decoration("wall-lt"),
    '╠': decoration("wall-lm", 2),
    '╚': decoration("wall-lb"),
    '╗': decoration("wall-rt"),
    '╣': decoration("wall-rm", 2),
    '╝': decoration("wall-rb"),
    // Windows
    '░': decoration("window-o"),
    '▒': decoration("window-h"),
    '▓': decoration("window-c"),
    '▄': decoration("thin-window-t"),
    '█': decoration("thin-window"),

    // Aircon
    '+': decoration("aircon"),
    // Dark tile
    '#': decoration("dark"),
    // Pipes
    'p': decoration("pipes-1"),
    'q': decoration("pipes-2-t"),
    'a': decoration("pipes-2-m"),
    'z': decoration("pipes-2-b"),
    'f': decoration("pipes-3"),
    // Wires
    'w': decoration("wires", 2),
    // Gadgets
    'v': decoration("vent"),
    's': decoration("small-screen"),
    't': decoration("thing"),
    // Railing
    '-': () => {
        // There's two frames, railing and railing with antenna.
        // This biases the random selection so the antenna appears less often.
        const frame = [0,0,0,0,0,1][Math.floor(rand(0,6))];
        return [
            sprite('rail', {frame}),
            scale(SCALE),
        ];
    },
}

export const entities = {
    'P': player,
    'G': greenGuy,
}

export const solidTiles = {
    // Invisible barrier
    'O': () => [
        sprite("blank"),
        scale(SCALE),
        area(),
        body({ isStatic: true }),
        tile({ isObstacle: true }),
        'boundary'
    ],
    // Ladders
    '≡': () => [
        sprite("ladder"),
        scale(SCALE),
        area({
            scale:vec2(0.1,1),
            offset:vec2(16*4,-10)
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