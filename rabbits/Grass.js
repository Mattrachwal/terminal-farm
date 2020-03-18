const Material = require('./Material');
class Grass extends Material {
  constructor (
    type,
    symbol,
    position_x,
    position_y,
    growth,
    growth_rate,
  ) {
    super(type, symbol, position_x, position_y);
    this.growth = growth;
    this.growth_rate = growth_rate;
  }

  _grow () {
    this.growth += 1;
  }
  


  simulate() {
    this._grow();
  }

  render(baseGrid) {
    if (this.growth < 0 ) {
      baseGrid[this.position.y][this.position.x] = ' ';
    } else if (this.growth / this.growth_rate <= 1 * this.growth_rate) {
      baseGrid[this.position.y][this.position.x] = '░';
    } else if (this.growth / this.growth_rate <= 2 * this.growth_rate) {
      baseGrid[this.position.y][this.position.x] = '▒';
    } else if ( this.growth / this.growth_rate <= 3 * this.growth_rate || this.growth / this.growth_rate >= 3 * this.growth_rate) {
      baseGrid[this.position.y][this.position.x] = '▓';
    }
  }

}

module.exports = Grass;