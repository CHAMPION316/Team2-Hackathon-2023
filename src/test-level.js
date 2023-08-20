
import { SCALE } from './game';
import { solidTiles, backgroundTiles, entities, props } from './sprite-atlas';

const BACKGROUND_LAYER = [
    '                     ---------------------------                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                 [ ]                                  ',
    '                     ╔ ▄  p  ┬+ #   p  ┬p  ▄  ╗                       ',
    '                     ╠ █  ░  │  #[ ]   │▓  █  ╣                   ┬   ',
    '                     ╠       │▓     ▒  │      ╣                   │   ',
    '                     ╠       │   [ ]   │      ╣                   │   ',
    '                     ╠ █     │         │   █  ╣                   │   ',
    '   ┬                 ╠    ▒  │         │░     ╣                   │   ',
    '   │                 ╠       │#       w│      ╣                   │   ',
    '   │                 ╠ █     │q_______w│   █  ╣                   │   ',
    '   │                 ╠       │a+ f#vs#w│      ╣                   │   ',
    '   ┴                 ╚    ###┴z   # t#w┴###   ╝                   ┴   ',
    '                                                                      '
];

const PLATFORM_LAYER = [
    'O                                                                    O',
    'O                                                                    O',
    'O                                                                    O',
    'O                                                                    O',
    'O                   <===========================>                    O',
    'O                                 ≡                                  O',
    'O                                 ≡                                  O',
    'O                                 ≡                                  O',
    'O                                 ≡                                  O',
    'O                                 ≡                                  O',
    'O                                 ¯                                  O',
    'O                             <=======>                              O',
    'O                                                                    O',
    'O                                                                    O',
    'O                                                                    O',
    '______________________________________________________________________'
];

const PROPS_LAYER = [
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                               7   0                                  ',
    '                    d       f      3            B                     ',
    '                                                                      ',
    '                                        4                        6 5  ',
    '                                                                      ',
    '   m                                                                  ',
    '  n s                                                                 ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '     8              9                                                 '
];

const ENTITY_LAYER = [
    '                               G                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '    P           G                                                     ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      '
];

export function loadLevel() {
    const skySize = vec2(128, 240);
    const levelTileWidth = BACKGROUND_LAYER[0].length;
    const levelTileHeight = BACKGROUND_LAYER.length;
    const tileSize = 16;
    const skyScale = 12;

    const levelWidth = (levelTileWidth * tileSize) // / skyScale;

    console.log(levelWidth);
    add([
        sprite('skyline', {tiled: true, width: levelWidth}),
        // pos(-width(), -height()),
        // scale(skyScale)
    ]);
    
    addLevel(BACKGROUND_LAYER, {
        tileWidth: 16 * SCALE,
        tileHeight: 16 * SCALE,
        tiles: backgroundTiles
    });
    
    // Platforms/Ladders
    addLevel(PLATFORM_LAYER, {
        tileWidth: 16 * SCALE,
        tileHeight: 16 * SCALE,
        tiles: solidTiles
    });
    
    ////////// Props
    addLevel(PROPS_LAYER, {
        tileWidth: 16 * SCALE,
        tileHeight: 16 * SCALE,
        tiles: props
    });
    
    ////////// Player/Enemies/Items
    const level = addLevel(ENTITY_LAYER, {
        tileWidth: 16 * SCALE,
        tileHeight: 16 * SCALE,
        tiles: entities
    });

    return level;
}
