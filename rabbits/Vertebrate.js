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
      direction: '',
      x: position_x,
      y: position_y,
    };
    this.focus = {
      x: this.position.x,
      y: this.position.y,
    }
    this.purpose = '';
    this.material = false;
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
      this.position.direction = 'left';
			//this.steps++;
		} else if (this.position.x < this.focus.x) {
      this.position.x = this.position.x + 1;
      this.position.direction = 'right';
			//this.steps++;
		}
		// handle Y traversal
		if (this.position.y > this.focus.y) {
      this.position.y = this.position.y - 1;
      this.position.direction = 'up';

			//this.steps++;
		} else if (this.position.y < this.focus.y) {
      this.position.y = this.position.y + 1;
      this.position.direction = 'down';

			//this.steps++;
    }
  }

  _arrived() {
    if(this.position.x === this.focus.x && this.position.y === this.focus.y) {
      return true;
    }
    return false;
  }

  findPurpose () {
    switch (getRandomIntWithMaxRange(2)) {
      case 0:
        this.purpose = 'walk';
        break;
      case 1:
        this.purpose = 'eat';
        break;
      default:
        this.purpose = 'walk';
    }
  }

  move (config, materials) {
    if (this._arrived()) {
      this.findPurpose();
      if (this.purpose === 'walk') {
        this._randomPosition(config)
      }
      if (this.purpose === 'eat') {
        this.searchForMaterial(materials);
        this.eatMaterial(this.searchPosition(materials))
      }
    }
    this._changePosition();
  }

  // Material interaction ===========================================

  searchForMaterial(materials) {
    for ( let i = getRandomIntWithMaxRange(materials.length - 1); i < materials.length; i++) {
      let material = materials[i];
      if (material.type === 'grass') {
        this.focus.x = material.position.x;
        this.focus.y = material.position.y;
        break;
      }
    }
  }

  searchPosition(materials) {
    for ( let material of materials ) {
      if (material.type === 'grass') {
        if ( this.position.x ===  material.position.x && this.position.y === material.position.y) {
          return material;
          break;
        }
      }
    }
  }

  eatMaterial (material) {
    material.growth -= 300;
  }


  render (baseGrid) {
    baseGrid[this.position.y][this.position.x] = this.symbol;
  }
}



module.exports = Vertebrate;