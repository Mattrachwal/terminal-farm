const { getRandomInt, get2DArray } = require('./util');
const Screen = require('./Screen');
const config = {
	frame_rate: 100,
	x_size: 50,
	y_size: 15,
	performance: false,
}

const baseGrid = get2DArray(config.x_size, config.y_size);

function runner(callback) {

  baseGrid[1][1] = getRandomIntWithMaxRange(5);

  screen.draw(screen.renderFrame(baseGrid));

	setTimeout(() => {
			callback();
	}, config.frame_rate);
}

function run() {
		runner( () => {
			run();
	});
}

const screen = new Screen();
run();