
import { SCALE } from './game';
import { getPlayer } from './player'
import { loadLevel } from './test-level'
import setupGreenGuy from './enemy';
import mainScene from './scene/menu'
import displayUi from './ui/ui';
import gameover from './scene/gameover';


scene('game', () => {
	setGravity(640 * SCALE);

	const level = loadLevel();
	const player = getPlayer(level);
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

// //Testing enemy
// const enemy1 = spawnEnemy(level, player, 15, 3);


