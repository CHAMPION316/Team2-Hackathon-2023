
import { SCALE, CAMERA_SCALE } from './game';
import { getPlayer } from './player'
import * as level1 from './levels/level-1'
import setupGreenGuy from './enemy';



scene('game', () => {
	setGravity(640 * SCALE);

	camScale(CAMERA_SCALE, CAMERA_SCALE);
	const level = level1.loadLevel();
	const player = getPlayer(level);
	setupGreenGuy(level);
});

scene('menu', () => {
	add([
		text('press a key')
	]);

	onKeyPress(()=> {
		go('game');
	});
});

go('menu');


