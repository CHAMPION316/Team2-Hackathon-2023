
import game, { SCALE } from './game';
import { getPlayer } from './player'
import level from './test-level'


setGravity(640 * SCALE);

const player = getPlayer(level);