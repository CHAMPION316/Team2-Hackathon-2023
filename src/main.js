
import { SCALE } from './game';
import { getPlayer } from './player'
import level from './test-level'
import setupGreenGuy from './enemy';


setGravity(640 * SCALE);


const player = getPlayer(level);
setupGreenGuy(level);

// //Testing enemy
// const enemy1 = spawnEnemy(level, player, 15, 3);


