
import game, { SCALE } from './game';
import spawnPlayer from './player'
import * as level from './test-level'


setGravity(640 * SCALE);


const player = spawnPlayer(pos(center()), 100);