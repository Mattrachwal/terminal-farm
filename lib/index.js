const Chicken = require('./Animal');
const Grass = require('./Item');
const Map = require('./Map');
const environment = require('./maps/smallMap');

const config = {
	frame_rate: 200,
	x_size: environment[0].length,
	y_size: environment.length,
	food_rate: 5,
	pen_x: environment[0].length - 4,
	pen_y: environment.length - 2,
	performance: false,
}

let getRandomInt = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

function printScreen (string) {
    //process.stdout.write('\x1Bc'); 
    console.clear();
	process.stdout.cursorTo(0);
	process.stdout.write(string);
}


const simulate = (state) => {
	const { chickens, map, config } = state;
	chickens.forEach( (chicken) => {
		chicken.simulate(state);
    })
}

const drawChickens = (state) => {
	const { chickens, map, config } = state;
    chickens.forEach( (chicken) => {
		if (!config.performance) {
			map[chicken.y_pos][chicken.x_pos] = `\u001b[48;5;${chicken.body.fg_color}m\u001b[48;5;${chicken.body.bg_color}m${chicken.body.ascii}\u001b[0m`;
		} else {
			map[chicken.y_pos][chicken.x_pos] = `${chicken.body.ascii}`;
		}
    })
}


const drawChickenInfo = (state) => {
	const { chickens } = state;
    let string = '';
    chickens.forEach( (chicken) => {
        string = string + ` Chicken: ${chicken.name} -- POS: X${chicken.x_pos}|Y${chicken.y_pos}\n`
        string = string + `  - HNG: ${chicken.hunger} DSR: ${chicken.desire} STP: ${chicken.steps}\n`
    });
    return string;
}

const drawFood = (state) => {
    state.food.forEach( (piece) => {
        state.map[piece.y_pos][piece.x_pos] = piece.image;
    })
}


function drawFrame(callback) {
	let string = '';
	state.map = JSON.parse(JSON.stringify(environment));;
	// Draw Food
    drawFood(state);
    // Simulate Life
	simulate(state);
	// Draw Chickens
    drawChickens(state);
    // Prepare Uber String **FRAME**
	for (let i = 0; i < config.y_size; i++) {
		for (let j = 0; j < config.x_size; j++) {
			string = string + state.map[i][j];
		}
		string = string + '\n';
	}
	// INFO OUTPUT
	string = string + '\n Total Chickens' + chickens.length;
	setTimeout(() => {
			printScreen(string);
			callback();
	}, config.frame_rate);
}

function runner() {
	//console.log(chickens);
		drawFrame( () => {
			runner();
	});
}

let food1 = new Grass();
const food = [food1]




const chickens = [];

for (let c  = 0; c < 1000; c++) {
	chickens.push(new Chicken(c, 'Ÿ', 238, 15, 'chicken'));
}

let map = new Map();
const state = {
	map: map.buildMap(environment, false),
	config: config,
	food: food,
	chickens: chickens,
	chicken: {
		instances: chickens,
	},
}
runner();