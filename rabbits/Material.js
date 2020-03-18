class Material {
  constructor (
    type,
    symbol,
    position_x,
    position_y,
  ) {
    this.type = type;
    this.symbol = symbol;
    this.position = {
      x: position_x,
      y: position_y,
    }
  }

  render (baseGrid) {
    baseGrid[this.position.y][this.position.x] = this.symbol;
  }
}

module.exports = Material;