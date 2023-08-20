
import { SCALE } from './game';
import { getPlayer } from './player'
import { loadLevel } from './test-level'
import setupGreenGuy from './enemy';



scene('game', () => {
	setGravity(640 * SCALE);

	const level = loadLevel();
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

// //Testing enemy
// const enemy1 = spawnEnemy(level, player, 15, 3);


