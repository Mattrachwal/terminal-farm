class Animal {
    constructor(name, body) {
        this.name = name;
        this.body = body
        this.x_pos = 1;
	    this.y_pos = 1;
        this.steps = 0;
        this.hunger = 0;
        this.hunger_rate = 1;
        this.hunger_threshold = 5;
        this.sex_drive = 0;
        this.sex_drive_rate = 1;
        this.sex_drive_threshold = 5;
        this.vision = 5;
        this.focus = {
            x_pos: 0,
            y_pos: 0,
        }
    }

    getRandomInt (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    randomPosition (config) {
		this.focus.x_pos = this.getRandomInt(config.pen_x + 4);
		this.focus.y_pos = this.getRandomInt(config.pen_y + 1);
		this.checkCollision(config);
	}

    findFocus (state) {
        const { config } = state;
        let focus = null;
		if (this.hunger >= this.hunger_threshold) {
			this.searchForFood();
		} else if (this.desire >= this.sex_drive_threshold) {
			this.searchForMate();
		} else {
			this.randomPosition(config);
		}
		this.moving = true;
    }

    findMate() {

    }

    findFood (state) {
        const { food } = state;
        let foundFood;
		food.forEach( (peice) => {
            if((Math.abs(this.x_pos - peice.x_pos) < this.vision) && (Math.abs(this.y_pos - peice.y_pos) < this.vision)) {
                foundFood = peice;
            }
        })

        if (foundFood) {
            this.focus.x_pos = foundFood.x_pos;
            this.focus.y_pos = foundFood.y_pos
        } else {
		    // If fails to find food
            this.randomPosition();
        }
    }
    
    move() {
        // handle X traversal
		if (this.x_pos > this.focus.x_pos) {
			this.x_pos = this.x_pos - 1;
			this.steps++;
		} else if (this.x_pos < this.focus.x_pos) {
			this.x_pos = this.x_pos + 1;
			this.steps++;
		}
		// handle Y traversal
		if (this.y_pos > this.focus.y_pos) {
			this.y_pos = this.y_pos - 1;
			this.steps++;
		} else if (this.y_pos < this.focus.y_pos) {
			this.y_pos = this.y_pos + 1;
			this.steps++;
		}
    }

    hasArrived() {
        if(this.x_pos === this.focus.x_pos && this.y_pos === this.focus.y_pos) {
			return true;
		}
    }

    searchPosition(state) {
        const { map } = state;
        let onThisBlock = map[this.y_pos][this.x_pos]
        // Needs to be refactored
		if (onThisBlock === '░') {
			this.hunger = this.hunger - 1;
		}
    }

    checkCollision(config) {
        if (this.focus.x_pos >= config.pen_x + 2) {
			this.focus.x_pos = config.pen_x + 1;
		} else if (this.focus.x_pos < 2 ) {
			this.focus.x_pos = 2;
		}

		if (this.focus.y_pos > config.pen_y + 1) {
			this.focus.x_pos = config.pen_x + 1;
		} else if (this.focus.y_pos === 0 ) {
			this.focus.y_pos = 1;
		}
    }

    entrophy() {
        if (this.steps > 100) {
			this.hunger = this.hunger + this.hunger_rate;
			this.sex_drive = this.sex_drive + this.sex_drive_rate;
			this.steps = 0;
		}
    }

};

module.exports = Animal;