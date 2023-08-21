
import { SCALE, CAMERA_SCALE } from './game';
import { setupPlayer } from './player'
import { setupGoal } from './goal';
import * as level1 from './levels/level-1'
import setupGreenGuy from './enemy';
import mainScene from './scene/menu'
import displayUi from './ui/ui';
import gameover from './scene/gameover';
import winScene from './scene/win';



loadSound("bg-music", "/assets/audio/bg-music-1.mp3")

play("bg-music", {
    volume: volume(),
    loop: true
})

scene('level1', () => {
    
	setGravity(640 * SCALE);

    

	
	camScale(CAMERA_SCALE, CAMERA_SCALE);
	const level = level1.loadLevel();
	const player = setupPlayer(level);
	setupGreenGuy(level);
	setupGoal(level);

    displayUi(player);
});


scene('main', () => {
	mainScene();
});

scene('gameover', () => {

	gameover();
})

scene('win', () => {
    winScene();
})

go('main');

// TEST
