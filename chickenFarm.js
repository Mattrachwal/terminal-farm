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
//└┘ 
// ┐ ┌
// ┤ ├
//│ ─
// ┼

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

const chicken_config = {
  vision: 4,
  hunger: {
    min: 0,
    max: 10,
    rate: 1,
		vision: 5,
		threshold: 5,
	},
	desire: {
		min: 0,
		max: 10,
		rate: 1,
		vision: 4,
		threshold: 5,
	}
}

function Food () {
	this.x_position = 5;
	this.y_position = 3;
	this.image = '░';
}

function Chicken (name, body) {
	this.name = name;
  this.x_position = 1;
	this.y_position = 1;
	this.steps = 0;
	this.hunger = 0;
	this.desire = 0;
	this.vision = 5;
	this.body = body
	this.focus = {
		x_position: 4,
		y_position: 4,
	}
	this.findFocus = () => {
		let focus = null;
		if (this.hunger >= chicken_config.hunger.threshold) {
			this.searchForFood();
		} else if (this.desire >= chicken_config.desire.threshold) {
			this.searchForMate();
		} else {
			this.randomPosition();
		}
		this.moving = true;
	}
	this.searchForFood = () => {
        let foundFood;
		food.forEach( (peice) => {
            if(Math.abs(this.x_position - peice.x_position) < this.vision && Math.abs(this.y_position - peice.y_position)) {
                foundFood = peice;
            }
        })

        if (foundFood) {
            this.focus.x_position = peice.x_position;
            this.focus.y_position = peice.y_position
        } else {
		    // If fails to find food
            this.randomPosition();
        }
	}
	this.searchForMate = () => {

		// If fails to find a mate
		this.randomPosition();
	}
	this.randomPosition = () => {
		this.focus.x_position = getRandomInt(config.pen_x + 4);
		this.focus.y_position = getRandomInt(config.pen_y + 1);
		this.checkCollision();
	}
	this.move = () => {
		// handle X traversal
		if (this.x_position > this.focus.x_position) {
			this.x_position = this.x_position - 1;
			this.steps++;
		} else if (this.x_position < this.focus.x_position) {
			this.x_position = this.x_position + 1;
			this.steps++;
		}
		// handle Y traversal
		if (this.y_position > this.focus.y_position) {
			this.y_position = this.y_position - 1;
			this.steps++;
		} else if (this.y_position < this.focus.y_position) {
			this.y_position = this.y_position + 1;
			this.steps++;
		}
	}
	this.hasArrived = () => {
		if(this.x_position === this.focus.x_position && this.y_position === this.focus.y_position) {
			return true;
		}
		
	}
	this.searchPosition = (map) => {
		let onThisBlock = map[this.y_position][this.x_position]
		if (onThisBlock === '░') {
			this.hunger = this.hunger - 1;
		} 
	}
	this.checkCollision = () => {
		if (this.focus.x_position >= config.pen_x + 2) {
			this.focus.x_position = config.pen_x + 1;
		} else if (this.focus.x_position < 2 ) {
			this.focus.x_position = 2;
		}

		if (this.focus.y_position > config.pen_y + 1) {
			this.focus.x_position = config.pen_x + 1;
		} else if (this.focus.y_position === 0 ) {
			this.focus.y_position = 1;
		}
	}
	this.entrophy = () => {
		if (this.steps > 100) {
			this.hunger = this.hunger + chicken_config.hunger.rate;
			this.desire = this.desire + chicken_config.desire.rate;
			this.steps = 0;
		}
	}
}

function simulate (map) {
	// Move first
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
// toggle that stuff for mac or windows.
// console.clear works flicker free on windows
// the process.stdout.write('\x1Bc'); for mac
function printScreen (string) {
    // process.stdout.write('\x1Bc'); 
    console.clear();
	process.stdout.cursorTo(0);
	process.stdout.write(string);
}

function drawFrame(callback) {
	let string = '';
	newFrame = JSON.parse(JSON.stringify(environment));;
	// PLACE FOOD
	food.forEach( (peice) => {
		newFrame[peice.y_position][peice.x_position] = peice.image;
	})
	simulate(newFrame);
	// SIMULATION OUTPUT
	chickens.forEach( (chicken) => {
		newFrame[chicken.y_position][chicken.x_position] = chicken.body;
	})
	for (let i = 0; i < config.y_size; i++) {
		for (let j = 0; j < config.x_size; j++) {
			string = string + newFrame[i][j];
		}
		string = string + '\n';
	}
	// INFO OUTPUT
	chickens.forEach( (chicken) => {
		string = string + ` Chicken: ${chicken.name} -- POS: X${chicken.x_position}|Y${chicken.y_position}\n`
		string = string + `  - HNG: ${chicken.hunger} DSR: ${chicken.desire} STP: ${chicken.steps}\n`
	});
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

// RUNNNNNNNNN

let food1 = new Food();

const food = [food1];

let chicken1 = new Chicken('1', 'x');
let chicken2 = new Chicken('2', 'X');
let chicken3 = new Chicken('3', '×');
let chicken4 = new Chicken('4', '+');
let chicken5 = new Chicken('1', 'x');
let chicken6 = new Chicken('2', 'X');
let chicken7 = new Chicken('3', '×');
let chicken8 = new Chicken('4', '+');
let chicken9 = new Chicken('1', 'x');
let chicken10 = new Chicken('2', 'X');
let chicken11 = new Chicken('3', '×');
let chicken12 = new Chicken('4', '+');
// const chickens = [chicken1,chicken2, chicken3, chicken4];
const chickens = [chicken1,chicken2, chicken3, chicken4,chicken5,chicken6,chicken7,chicken8,chicken9,chicken10,chicken11,chicken12];



runner();


// 4,5
// 2,3

// const determineDistance = () {
// 	Math.abs(a - b)
// 	Math.abs(a - b)
// }