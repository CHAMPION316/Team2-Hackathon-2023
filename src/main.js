
import { SCALE, CAMERA_SCALE } from './game';
import { setupPlayer } from './player'
import * as level1 from './levels/level-1'
import setupGreenGuy from './enemy';



scene('level1', () => {
	setGravity(640 * SCALE);
	
	camScale(CAMERA_SCALE, CAMERA_SCALE);
	const level = level1.loadLevel();
	setupPlayer(level);
	setupGreenGuy(level);
});

scene('menu', () => {
	add([
		text('press a key')
	]);

	onKeyPress(()=> {
		go('level1');
	});
});

go('menu');


