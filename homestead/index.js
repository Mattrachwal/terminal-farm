const { getRandomInt } = require('./util');
const Screen = require('./Screen');
const frameArray = [
  [0,0,1,0,0],
  [1,1,0,1,1]
]
const config = {
	frame_rate: 100,
	x_size: 50,
	y_size: 15,
	performance: false,
}


function runner(callback) {

  frameArray[1][1] = getRandomInt(5);

  screen.draw(screen.renderFrame(frameArray));

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