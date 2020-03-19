const getRandomIntWithMaxRange = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

const getRandomIntWithMinMaxRange = (min, max) => {
  return Math.floor(min + Math.random() * Math.floor(max - min));
}

const get2DArray = (x,y) => {
  let grid = [];
  for ( var i = 0; i < y; i++ ) {
    grid.push([])
    for (var j = 0; j < x; j++ ) {
        grid[i][j] = ' ';
    }
  }
  return grid;
}

module.exports = {
  getRandomIntWithMaxRange,
  getRandomIntWithMinMaxRange,
  get2DArray,
}