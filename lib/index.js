const Chicken = require('./Animal');
const Grass = require('./Item');

let environment = [
	[' ','╔','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','╗',' '], //1
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //2
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //3
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //4
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //5
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //6
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //7
    [' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //9
    [' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //6
    [' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //6
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //6
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //6
	[' ','║',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ',' ','║',' '], //6
    [' ','╚','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','═','╝',' '] //15
];

const config = {
	frame_rate: 200,
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
    // process.stdout.write('\x1Bc'); 
    console.clear();
	process.stdout.cursorTo(0);
	process.stdout.write(string);
}


const simulate = (chickens, map) => {
    console.log(chickens);
    chickens.forEach( (chicken) => {

        if (chicken.hasArrived()) {
            chicken.findFocus()
        } else (
            chicken.move()
        )
        chicken.entrophy();
    })

    chickens.forEach( (chicken) => {
        chicken.searchPosition(map)
    })
}

const drawChickens = (chickens, map) => {
    chickens.forEach( (chicken) => {
        map[chicken.y_pos][chicken.x_pos] = chicken.body;
    })
}

const drawChickenInfo = (chickens) => {
    let string = '';
    chickens.forEach( (chicken) => {
        string = string + ` Chicken: ${chicken.name} -- POS: X${chicken.x_pos}|Y${chicken.y_pos}\n`
        string = string + `  - HNG: ${chicken.hunger} DSR: ${chicken.desire} STP: ${chicken.steps}\n`
    });
    return string;
}



const drawFood = (food, map) => {
    console.log(food[0].image);
    food.forEach( (piece) => {
        map[piece.y_pos][piece.x_pos] = piece.image;
    })
}


function drawFrame(callback) {
	let string = '';
	let newFrame = JSON.parse(JSON.stringify(environment));;
	// Draw Food
    drawFood(food, newFrame);
    // Simulate Life
	simulate(chickens, newFrame);
	// Draw Chickens
    drawChickens(chickens, newFrame);
    // Prepare Uber String **FRAME**
	for (let i = 0; i < config.y_size; i++) {
		for (let j = 0; j < config.x_size; j++) {
			string = string + newFrame[i][j];
		}
		string = string + '\n';
	}
	// INFO OUTPUT
	string = string + drawChickenInfo(chickens);
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

let chicken1 = new Chicken('1', '\x1b[41m\x1b[36mx\x1b[0m');
let chicken2 = new Chicken('2', 'X');
const chickens = [chicken1, chicken2];
runner();