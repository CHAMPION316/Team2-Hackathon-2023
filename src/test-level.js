
import game, { SCALE } from './game';
import * as warped from './warped';

// platforms
addLevel([
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                 |                                    ',
    '                                 |                                    ',
    '                                 |                                    ',
    ' <==================================================================> '
], {
    tileWidth: 16 * SCALE,
	tileHeight: 16 * SCALE,
    tiles: {
        '<': () => [
            sprite("platform-l"),
            area(),
            scale(SCALE),
            body({ isStatic: true }),
            tile({ isObstacle: true }),
        ],
        '=': () => [
            sprite("platform-m"),
            area(),
            scale(SCALE),
            body({ isStatic: true }),
            tile({ isObstacle: true }),
        ],
        '>': () => [
            sprite("platform-r"),
            area(),
            scale(SCALE),
            body({ isStatic: true }),
            tile({ isObstacle: true }),
        ],
        '|': () => [
            sprite("pillar-lm"),
            area(),
            scale(SCALE),
            body({ isStatic: true }),
            tile({ isObstacle: true }),
        ]
    }
});
