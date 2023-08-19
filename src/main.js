
import game from './game';
import createPlayer from './player'


setGravity(640);


const player = createPlayer(pos(center()), 100);

game.add([
	rect(width(), 24),
	area(),
	outline(1),
	pos(0, height() - 24),
	body({ isStatic: true }),
])