
import game, { SCALE } from './game';
import { getPlayer } from './player'
import level from './test-level'
import spawnEnemy from './enemy';


setGravity(640 * SCALE);

const player = getPlayer(level);


//Testing enemy
const enemy1 = spawnEnemy(level, player, 15, 3);

// const player = spawnPlayer(pos(center()), 100);