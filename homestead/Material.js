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
    this.held = false;
  }

  render (baseGrid) {
    baseGrid[this.position.y][this.position.x] = this.symbol;
  }

  checkCollision(config) {
    if (this.position.x >= config.x_size ) {
      this.position.x = config.x_size - 1;
    } else if (this.position.x < 0 ) {
      this.position.x = 0;
    }

    if (this.position.y >= config.y_size) {
      this.position.y = config.y_size - 1;
    } else if (this.position.y < 0 ) {
      this.position.y = 0;
    }
  }

  toggleStatus () {
    if (this.held) {
      this.held = false;
    }
    this.held = true;
  }

}

module.exports = Material;