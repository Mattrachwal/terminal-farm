const Chicken = require('./Animal');
// const Grass = require('./Item');
const Map = require('./Map');
const Screen = require('./Screen');
const environment = require('./maps/smallMap');
const config = {
	frame_rate: 1,
	x_size: environment[0].length,
	y_size: environment.length,
	food_rate: 5,
	pen_x: environment[0].length - 4,
	pen_y: environment.length - 2,
	performance: true,
}

const initConfig = {
	entities: [
		{
			class: Chicken,
			count: 5,
			type: 'chicken',
			name: 'test',
			ascii: 'Ÿ',
			fg_color: 238,
			bg_color: 15
		}
	]
}

function bufferToScreen (string) {
	process.stdout.cursorTo(0);
	console.clear();
	var writeBuffer = Buffer(string);
	process.stdout.write(writeBuffer);
}

const initGame = (state, initConfig) => {
	//init entities
	initConfig.entities.forEach( (entity) => {
		state.resources[entity.type] = {};
		state.resources[entity.type].entities = [];
		for ( let i = 0; i < entity.count; i++ ) {
			state.resources[entity.type].entities.push(initEntity(entity));
		}
	});
}

const initEntity = (entity) => {
	return new entity.class (
		entity.name, 
		entity.ascii, 
		entity.fg_color, 
		entity.bg_color, 
		entity.type);
}

const simulate = (state) => {
	for ( resource in state.resources ) {
		state.resources[resource].entities.forEach( (entity) => {
			entity.simulate(state);
		});
	};
}

const placeEntities = (state) => {
	for ( resource in state.resources ) {
		state.resources[resource].entities.forEach( (entity) => {
			state.map[entity.y_pos][entity.x_pos] = `${entity.body.ascii}`;
		});
	};
}

function drawFrame(callback) {
	let string = '';
	state.map = JSON.parse(JSON.stringify(environment));

	// Draw Food
  // DrawFood(state);
  // Simulate Life
	simulate(state);
	// Draw Chickens
	placeEntities(state);
	// INFO OUTPUT
	
	for (let i = 0; i < config.y_size; i++) {
		for (let j = 0; j < config.x_size; j++) {
			string = string + state.map[i][j];
		}
		string = string + '\n';
	}

	bufferToScreen(string);
	setTimeout(() => {
			callback();
	}, config.frame_rate);
	
}

function runner() {
	//console.log(chickens);
		drawFrame( () => {
			runner();
	});
}

let map = new Map();
const state = {
	map: map.buildMap(environment, true),
	config: config,
	resources: {},
}

initGame(state, initConfig);
runner();