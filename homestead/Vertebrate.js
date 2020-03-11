class Vertebrate {
  constructor (
    type,
    age = 0,
    range,
    position_x,
    position_y
    ) {
    this.type = type;
    this.age = age;
    this.range = range
    this.position = {
      x: position_x,
      y: position_y,
    };
    this.focus = {
      x: this.position.x,
      y: this.position.y,
    }
  }

  _getChoice () {
    return Math.floor(Math.random() * Math.floor(2));
  }

  checkCollision(config) {
    if (this.focus.x >= config.x_size ) {
      this.focus.x = config.x_size;
    } else if (this.focus.x < 0 ) {
      this.focus.x = 0;
    }

    if (this.focus.y >= config.size_y) {
      this.focus.y = config.size_y;
    } else if (this.focus.y < 0 ) {
      this.focus.y_pos = 0;
    }
  }

  _randomPosition (config) {  
		this.focus.x_pos = this.getChoice() ? this.focus.x_pos + this.getRandomInt(this.range) : this.focus.x_pos - this.getRandomInt(this.range)
		this.focus.y_pos = this.getChoice() ? this.focus.y_pos + this.getRandomInt(this.range) : this.focus.y_pos - this.getRandomInt(this.range)
		this.checkCollision(config);
  }
  
  _changePosition () {
    if (this.position.x > this.focus.x) {
			this.position.x = this.position.x;
			//this.steps++;
		} else if (this.position.x < this.focus.x) {
			this.position.x = this.position.x;
			//this.steps++;
		}
		// handle Y traversal
		if (this.position.y > this.focus.y) {
			this.position.y = this.position.y;
			//this.steps++;
		} else if (this.position.y < this.focus.y) {
			this.position.y = this.position.y;
			//this.steps++;
    }
  }

  _arrived() {
    if(this.position.x === this.focus.x && this.position.y === this.focus.y) {
      return true;
    }
    return false;
  }


  move (config) {
    if (! this._arrived()) {
      this._changePosition();
    }
    this._randomPosition(config)
  }
}



module.exports = Vertebrate;