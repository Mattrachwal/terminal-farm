const { getRandomIntWithMaxRange, get2DArray } = require('./util');
const Screen = require('./Screen');
const Vertebrate = require('./Vertebrate');
const Material = require('./Material');

const config = {
	frame_rate: 100,
	x_size: 40,
	y_size: 20,
	performance: false,
}

const vertebrates = []
for (var j = 0; j < 100; j++) {
	vertebrates.push(new Vertebrate('human', '¶', 25, 10, 1, 1));
}



const materials = []
for (var i = 0; i < 200; i++ ){
	materials.push(new Material('block', '█', 10, 5) );
}





//vertebrates[0].pickupMaterial(materials[0]);

function simulate(config, materials) {
	vertebrates.forEach(vertebrate => {
		vertebrate.move(config, materials);
		if(vertebrate.material) {
			vertebrate.carryMaterial(config);
		}
	})
}

function applyLayers (baseGrid) {
	vertebrates.forEach(vertebrate => {
		vertebrate.render(baseGrid);
	})
	materials.forEach(material => {
		material.render(baseGrid);
	})
}

function runner(callback) {
	const baseGrid = get2DArray(config.x_size, config.y_size);
	simulate(config, materials);
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