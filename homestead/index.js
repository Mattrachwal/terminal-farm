const { getRandomIntWithMaxRange, get2DArray } = require('./util');
const Screen = require('./Screen');
const vertebrate = require('./Vertebrate');

const config = {
	frame_rate: 50,
	x_size: 50,
	y_size: 15,
	performance: false,
}

const baseGrid = get2DArray(config.x_size, config.y_size);
const vertebrates = []
vertebrates.push(new vertebrate('human', '¶', 25, 10, 1, 1));
vertebrates.push(new vertebrate('dog', 'æ', 25, 10, 1, 1));

function simulate(config) {
	vertebrates.forEach(vertebrate => {
		vertebrate.move(config);
	})
}

function applyLayers (baseGrid) {
	vertebrates.forEach(vertebrate => {
		vertebrate.render(baseGrid);
	})
}

function runner(callback) {
	simulate(config);
	baseGrid[1][1] = getRandomIntWithMaxRange(5);
	applyLayers(baseGrid);
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