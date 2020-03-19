const { getRandomIntWithMaxRange, get2DArray } = require('./util');
const Screen = require('./Screen');
const Vertebrate = require('./Vertebrate');
const Grass = require('./Grass');

const config = {
	frame_rate: 50,
	x_size: 90,
	y_size: 40,
	performance: false,
}

const vertebrates = []
for (var j = 0; j < 100; j++) {
	vertebrates.push(new Vertebrate('human', '¶', 3, 4, 1, 1));
}



const materials = []
for (var i = 0; i < config.x_size; i++) {
	for (var j = 0; j < config.y_size; j++) {
		materials.push(new Grass('grass', ' ', i, j, 0, 10) );
	}
}


//vertebrates[0].pickupMaterial(materials[0]);

function simulate(config, materials) {
	vertebrates.forEach(vertebrate => {
		vertebrate.move(config, materials);
		if(vertebrate.material) {
			vertebrate.carryMaterial(config);
		}
	})
	materials.forEach(material => {
		material.simulate();
	})
}

function applyLayers (baseGrid) {
	materials.forEach(material => {
		material.render(baseGrid);
	})
	vertebrates.forEach(vertebrate => {
		vertebrate.render(baseGrid);
	})
}

function runner(callback) {
	const baseGrid = get2DArray(config.x_size, config.y_size);
	simulate(config, materials);
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