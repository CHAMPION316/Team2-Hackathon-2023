
import { SCALE } from './game';
import { tiles, backgroundTiles, entities } from './warped';

addLevel([
    '                                 [ ]                                  ',
    '                     ╔ ▄  p  ┬#+       ┬   ▄  ╗                       ',
    '                     ╠ █     │#  [ ]   │   █  ╣                       ',
    '                     ╠    ░  │▓     ▒  │▓     ╣                       ',
    '                     ╠       │   [ ]   │      ╣                       ',
    '                     ╠ █     │         │   █  ╣                       ',
    '                     ╠       │         │      ╣                       ',
    '                     ╠       │         │      ╣                       ',
    '                     ╠ █     │         │   █  ╣                       ',
    '                     ╠       │         │      ╣                       ',
    '                     ╚       ┴         ┴      ╝                       ',
    '                                                                      '
], {
    tileWidth: 16 * SCALE,
	tileHeight: 16 * SCALE,
    tiles: backgroundTiles
});

// Platforms/Ladders
addLevel([
    '                    <===========================>                     ',
    '                                  ≡                                   ',
    '                                  ≡                                   ',
    '                                  ≡                                   ',
    '                                  ≡                                   ',
    '                                  ≡                                   ',
    '                                  ¯                                   ',
    '                              <=======>                               ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '______________________________________________________________________'
], {
    tileWidth: 16 * SCALE,
	tileHeight: 16 * SCALE,
    tiles
});

////////// Player/Enemies/Items
const level = addLevel([
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                                                                      ',
    '                               P                                      ',
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