
import { SCALE, CAMERA_SCALE } from './game';
import { setupPlayer } from './player'
import * as level1 from './levels/level-1'
import setupGreenGuy from './enemy';
import mainScene from './scene/menu'
import displayUi from './ui/ui';
import gameover from './scene/gameover';


scene('level1', () => {
	setGravity(640 * SCALE);
	
	camScale(CAMERA_SCALE, CAMERA_SCALE);
	const level = level1.loadLevel();
	setupPlayer(level);
	setupGreenGuy(level);

    displayUi(player);
});


scene('main', () => {
	mainScene();
    
});

scene('gameover', () => {
    gameover();
})

go('main');


