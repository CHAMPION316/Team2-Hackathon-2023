
import game, { SCALE } from './game';
import { getPlayer } from './player'
import level from './levels/level-1'


setGravity(640 * SCALE);

const player = getPlayer(level);