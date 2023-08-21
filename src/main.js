
import { SCALE, CAMERA_SCALE } from './game';
import { setupPlayer } from './player'
import { setupGoal } from './goal';
import * as level1 from './levels/level-1'
import setupGreenGuy from './enemy';
import mainScene from './scene/menu'
import displayUi from './ui/ui';
import gameover from './scene/gameover';
import winScene from './scene/win';



// Plays background music once the player has clicked once
loadSound("bg-music", "/assets/audio/bg-music-1.mp3")
export const bgMusic = play("bg-music", {
    loop: true
})

// Loads one level
scene('level1', () => {
	setGravity(640 * SCALE);

	camScale(CAMERA_SCALE, CAMERA_SCALE);
	const level = level1.loadLevel();
	const player = setupPlayer(level);
	setupGreenGuy(level);
	setupGoal(level);

    displayUi(player);
});

// Loads the main scene
scene('main', () => {
	mainScene();
});


// Loads the gameover screen
scene('gameover', () => {
	gameover();
})

// Loads the win screen
scene('win', () => {
    winScene();
})

go('main');
