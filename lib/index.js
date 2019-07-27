const Chicken = require('./Animal');
const Grass = require('./Item');
const Map = require('./Map');

let environment = [
	[0,1,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,2,0], //1
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //2
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //3
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //4
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //5
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //6
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //7
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //9
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //6
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //6
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //6
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //6
	[0,6,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,6,0], //6
	[0,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,3,0] //15
];

const config = {
	frame_rate: 25,
	x_size: environment[0].length,
	y_size: environment.length,
	food_rate: 5,
	pen_x: environment[0].length - 4,
	pen_y: environment.length - 2,
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
	const { chickens, map } = state;
    chickens.forEach( (chicken) => {
        map[chicken.y_pos][chicken.x_pos] = chicken.body;
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
	// string = string + drawChickenInfo(state);
	setTimeout(() => {
			printScreen(string);
			callback();
	}, config.frame_rate);
}

function runner() {
		drawFrame( () => {
			runner();
	});
}

let food1 = new Grass();
const food = [food1]



let chicken1 = new Chicken('1', '\x1b[41m\x1b[36mx\x1b[0m', 'chicken');
let chicken2 = new Chicken('2', '\u001b[38;5;136mX\x1b[0m', 'chicken');
const chickens = [chicken1, chicken2];

for (let c  = 0; c < 2; c++) {
	chickens.push(new Chicken(c, '\u001b[38;5;136mX\x1b[0m', 'chicken'));
}

let map = new Map();
const state = {
	map: map.buildMap(environment, true),
	config: config,
	food: food,
	chickens: chickens,
	chicken: {
		instances: chickens,
	},
}
console.log(chickens);
runner();