
import { SCALE } from '../game';
import { solidTiles, backgroundTiles, backgroundBuildings, entities, props } from '../sprite-atlas';

const BUILDINGS_LAYER = [
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                ',
    '                                                                                                                                                                                                                                '
];
const BACKGROUND_LAYER = [
    '                     ---------------------------                                                                                                                                                                                 ',
    '                                                                                                                                                                                                                                 ',
    '                                                                                                                                                                                                                                 ',
    '                                                    ╣                                                                                                                                                                            ',
    '                                 [ ]                ╣                                                                                                                                                                            ',
    '                     ╔ ▄  p  ┬+ #   p  ┬p  ▄  ╗╔    ╣                                                                     [ ]╔ ┬╗╔ ┬╗╔ ┬╗╔ ┬╗╔ ┬╗                                                                                ',
    '                     ╠ █  ░  │  #[ ]   │▓  █  ╣╠ ░  ╣             ┬         ╠ #########################╣                     ╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',
    '                     ╠       │▓     ▒  │      ╣╠    ╣             │         ╠ #########################╣                  [ ]╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',
    '                     ╠       │   [ ]   │      ╣╠    ╣             │         ╠ #########################╣                     ╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',
    '                     ╠ █     │         │   █  ╣╠ ░  ╣             │         ╠ ###▓  #####▒  #####▓  ###╣                  [ ]╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',      
    '   ┬                 ╠    ▒  │         │░     ╣╠    ╣             │         ╠ ###   #####   #####   ###╣                     ╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',
    '   │                 ╠       │#       w│      ╣╠    ╣             │         ╠ ###   #####   #####   ###╣                  [ ]╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',
    '   │                 ╠ █     │q_______w│   █  ╣╠ ░  ╣             │         ╠ ###   #####   #####   ###╣                     ╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',
    '   │                 ╠       │a+ f#vs#w│      ╣╠    ╣             │         ╠ #########################╣                  [ ]╠ │╣╠ │╣╠ │╣╠ │╣╠ │╣                                                                                ',
    '   ┴                 ╚    ###┴z   # t#w┴###   ╝╚    ╝             ┴         ╚ #########################╝                     ╚ ┴╝╚ ┴╝╚ ┴╝╚ ┴╝╚ ┴╝                                                                                ',
    '                                                                                                                                       '
];
const PLATFORM_LAYER = [
    'O                                                                                                                                                                                                                                O',
    'O                                                                                                                                                                                                                                O',
    'O                                                                                                                                                                                                                                O',
    'O                                                    _                                                                                                                                                                           O',
    'O                   <===========================>                                                                         ========================                                                                               O',
    'O                                 ≡                                        <=============================>                 ≡ O                                                                                                   O',
    'O                                 ≡                                                                                        ≡ O                                                                                                   O',
    'O                                 ≡                                                                                        ≡ O                                                                                                   O',
    'O                                 ≡                                                                                        ≡ O                                                                                                   O',
    'O                                 ≡                                                                                        ≡ O                                                                                                   O',
    'O                                 ¯                                                                                        ≡ O                                                                                                   O',
    'O                             <=======>                                                                                    ≡ O                                                                                                   O',
    'O                                                                                                                          ≡ O                                                                                                   O',
    'O                                                                                                                          ≡ O                                                                                                   O',
    'O                                                                                                                          ≡ O                                                                                                   O',
    '_________________________________________________________________________________________________________________________________________________________________________________________________________________________________ '
];
const PROPS_LAYER = [
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                     7                                                                                                                                                                            ',
    '                               7   0                                                                                                             n                                                                                ',
    '                    d       f      3            B                                                                                                                                                                                 ',
    '                                                                             5                                                                                                                                                    ',
    '                                        4                        6 5                                                                             n                                                                                ',
    '                                                                                                                                                                                                                                  ',
    '   m                                                                                                                                                                                                                              ',
    '  n s                                                                                                                         2                                                                                                   ',
    '                                 mmm                                                                                                                                                                                              ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '     8              9                                                                                                                                                                                                             '
];
const ENTITY_LAYER = [
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '                                                                                                                                                                                                                                  ',
    '    P                                                                                                                                                                                                                             ',
    '                                                                                                                                                                                                                                  ',
    '                      G                                                                    G    G   G   G                                                                                                                         ',
    '                                                                                                                                                                                                                              @@@ ',
    '                                                                                                                                                                                                                              @@@ ',
    '                                                                                                                                                                                                                              @@@ ',
    '                                                                                                                                                                                                                                  '
];

export function loadLevel() {
    setCursor("crosshair")

    const levelTileWidth = BACKGROUND_LAYER[0].length;
    const levelTileHeight = BACKGROUND_LAYER.length;
    const tileSize = 16;
    const levelWidth = (levelTileWidth * tileSize);
    const levelHeight = (levelTileHeight * tileSize);
    const skyScale = ((height() + levelHeight) / 240) * SCALE;

    add([
        sprite('skyline', {tiled: true, width: levelWidth}),
        scale(skyScale),
        anchor('center'),
    ]);

    // background buildings
    addLevel(BUILDINGS_LAYER, {
        tileWidth: 16 * SCALE,
        tileHeight: 16 * SCALE,
        tiles: backgroundBuildings
    });

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