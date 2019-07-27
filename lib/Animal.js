class Animal {
    constructor(
        name, 
        body, 
        type, 
        x_pos = null,
        y_pos = null,
        age = null
        ) {
        this.age = age || 0;
        this.name = name;
        this.body = body;
        this.type = type;
        this.sex = this.getSex();
        this.x_pos = x_pos || 1;
        this.y_pos = y_pos || 1;
        this.range = 5;
        this.steps = 0;
        this.steps_to_entrophy = 12;
        this.hunger = 0;
        this.hunger_rate = 1;
        this.hunger_threshold = 20;
        this.sex_drive = 0;
        this.sex_drive_rate = 1;
        this.sex_drive_threshold = 10;
        this.vision = 10;
        this.focus = {
            x_pos: this.x_pos,
            y_pos: this.y_pos,
        }
    }

    getRandomInt (max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    /**
     * return one or the other 50% chance
     */
    getChoice () {
        return Math.floor(Math.random() * Math.floor(2));
    }

    /**
     * Male = 0; Female = 1;
     */
    getSex () {
        return this.getChoice();
    }

    randomPosition (config) {  
		this.focus.x_pos = this.getChoice() ? this.focus.x_pos + this.getRandomInt(this.range) : this.focus.x_pos - this.getRandomInt(this.range)
		this.focus.y_pos = this.getChoice() ? this.focus.y_pos + this.getRandomInt(this.range) : this.focus.y_pos - this.getRandomInt(this.range)
		this.checkCollision(config);
	}

    findFocus (state) {
        const { config } = state;
		if (this.hunger >= this.hunger_threshold) {
			this.findFood(state);
		} else if (this.sex_drive >= this.sex_drive_threshold) {
			this.sex ? this.waitForMate(state) : this.findMate(state);
		} else {
			this.randomPosition(config);
		}
		this.moving = true;
    }

    findMate(state) {
        let mateFound = false;
        const animals = state[this.type].instances;
        animals.forEach( (animal) => {
            if (animal.sex) {
                this.focus.x_pos = animal.x_pos;
                this.focus.y_pos = animal.y_pos;
                mateFound = true
            }
        });
        if (!mateFound) {
            this.randomPosition(state.config);
        }
    }

    waitForMate () {
        return true;
    }

    mate (state) {
        state[this.type].instances.push(new Animal('baby','Ÿ', this.type, this.x_pos, this.y_pos));
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
            this.randomPosition(state.config);
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
        const { map, food } = state;
        let somethingFound = false;
        // CHECK FOR FOOD. 
        // I want to change this so when the animal searches for food, it has a target that is
        // a reference so when it arrives, it can just check if reference exists and check its position
        // otherwise i have to loop throuh all the food again and again on every single block. but maybe
        // its nessasary so it can grab food anywhere?. probably the 2nd thing dang.
        if (this.hunger > 0 ) {
            food.forEach( (peice) => {
                if (this.x_pos === peice.x_pos && this.y_pos === peice.y_pos) {
                    this.hunger = this.hunger - this.hunger_rate;
                    somethingFound = true;
                }
            });
        }

        if (this.sex_drive > this.sex_drive_threshold) {
            const animals = state[this.type].instances;
            animals.forEach( (animal) => {
                if (this.x_pos === animal.x_pos && this.y_pos === animal.y_pos) {
                    this.mate(state);
                    somethingFound = true;
                }
                animal.sex_drive = 0;
                this.sex_drive = 0;
            });
        }
        return somethingFound;
    }

    checkCollision(config) {
        if (this.focus.x_pos >= config.pen_x + 2) {
			this.focus.x_pos = config.pen_x + 1;
		} else if (this.focus.x_pos < 2 ) {
			this.focus.x_pos = 2;
		}

		if (this.focus.y_pos >= config.pen_y + 1) {
			this.focus.y_pos = config.pen_y;
		} else if (this.focus.y_pos <= 0 ) {
			this.focus.y_pos = 1;
		}
    }

    entrophy() {
        if (this.steps > this.steps_to_entrophy) {
            this.age = this.age + 1;
			this.hunger = this.hunger + this.hunger_rate;
			this.sex_drive = this.sex_drive + this.sex_drive_rate;
			this.steps = 0;
		}
    }

    checkCondition() {
        if (this.hunger > 0 || this.sex_drive > 0) {
            return true;
        }
        return false;
    }

    simulate(state) {
        //checkPosition
        this.entrophy();
		if (this.searchPosition(state)) {
            //do nothing because its handled in searchPosition.... gotta rethink this later
        } else {
            //decdie to rest
            if (this.getRandomInt(5) % 3 !== 0) {
                //check if need new position to move to
                //move
                if (this.hasArrived()) {
                    this.findFocus(state)
                }
                this.move()
                
            }  
        }
		
    }

};

module.exports = Animal;