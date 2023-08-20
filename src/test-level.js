
import { SCALE } from './game';
import { solidTiles, backgroundTiles, entities, props } from './assets/warped';

addLevel([
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
], {
    tileWidth: 16 * SCALE,
	tileHeight: 16 * SCALE,
    tiles: backgroundTiles
});

// Platforms/Ladders
addLevel([
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
], {
    tileWidth: 16 * SCALE,
	tileHeight: 16 * SCALE,
    tiles: solidTiles
});

////////// Props
addLevel([
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
], {
    tileWidth: 16 * SCALE,
	tileHeight: 16 * SCALE,
    tiles: props
});

////////// Player/Enemies/Items
const level = addLevel([
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '    P                                                                 ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      '
], {
    tileWidth: 16 * SCALE,
	tileHeight: 16 * SCALE,
    tiles: entities
});


export default level;