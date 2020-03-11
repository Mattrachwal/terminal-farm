const { getRandomIntWithMaxRange } = require('./util')
class Vertebrate {
  constructor (
    type,
    symbol,
    age = 0,
    range,
    position_x,
    position_y
    ) {
    this.type = type;
    this.symbol = symbol;
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

  _checkCollision(config) {
    if (this.focus.x >= config.x_size ) {
      this.focus.x = config.x_size - 1;
    } else if (this.focus.x < 0 ) {
      this.focus.x = 0;
    }

    if (this.focus.y >= config.y_size) {
      this.focus.y = config.y_size - 1;
    } else if (this.focus.y < 0 ) {
      this.focus.y = 0;
    }
  }

  _randomPosition (config) {  
		this.focus.x = this._getChoice() ? this.focus.x + getRandomIntWithMaxRange(this.range) : this.focus.x - getRandomIntWithMaxRange(this.range)
		this.focus.y = this._getChoice() ? this.focus.y + getRandomIntWithMaxRange(this.range) : this.focus.y - getRandomIntWithMaxRange(this.range)
		this._checkCollision(config);
  }
  
  _changePosition () {
    if (this.position.x > this.focus.x) {
			this.position.x = this.position.x - 1;
			//this.steps++;
		} else if (this.position.x < this.focus.x) {
			this.position.x = this.position.x + 1;
			//this.steps++;
		}
		// handle Y traversal
		if (this.position.y > this.focus.y) {
			this.position.y = this.position.y - 1;
			//this.steps++;
		} else if (this.position.y < this.focus.y) {
			this.position.y = this.position.y + 1;
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
    if (this._arrived()) {
      this._randomPosition(config)
    }
    this._changePosition();
  }

  render (baseGrid) {
    baseGrid[this.position.y][this.position.x] = this.symbol;
  }
}



module.exports = Vertebrate;