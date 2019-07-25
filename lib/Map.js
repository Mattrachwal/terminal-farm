class Map {
  constructor() {
    this.colors = {
      whiteFg: '\u001b[38;5;15m',
      whiteBg: '\u001b[48;5;15m',
      redFg: '\u001b[38;5;160m',
      redBg: '\u001b[48;5;160m',
      greenFg: '\u001b[38;5;70m',
      greenBg: '\u001b[48;5;70m',
      brownFg: '\u001b[38;5;130m',
      brownBg: '\u001b[48;5;130m',
      greyFg: '\u001b[38;5;243m',
      greyBg: '\u001b[48;5;243m',
      reset: '\u001b[0m'
    }
  }
  
  buildMap(map, performanceMode) {
    let createSprite;
    if (performanceMode) {
      createSprite = this.createSpritePerformance.bind(this);
    } else {
      createSprite = this.createSprite.bind(this);
    }
    for (let i = 0; i < map.length; i++) {
      for (let j = 0; j < map[i].length; j++) {
        map[i][j] = createSprite(map[i][j]);
      }
    }
  }
  createSprite(sprite) {
    switch(sprite) {
      case 0:
        return `${this.colors.greenBg} ${this.colors.reset}`;
      case 1:
        return `${this.colors.brownFg}${this.colors.greenBg}╔${this.colors.reset}`;
      case 2:
        return `${this.colors.brownFg}${this.colors.greenBg}╗${this.colors.reset}`;
      case 3:
        return `${this.colors.brownFg}${this.colors.greenBg}╝${this.colors.reset}`;
      case 4:
        return `${this.colors.brownFg}${this.colors.greenBg}╚${this.colors.reset}`;
      case 5: 
        return `${this.colors.brownFg}${this.colors.greenBg}═${this.colors.reset}`;
      case 6:
          return `${this.colors.brownFg}${this.colors.greenBg}║${this.colors.reset}`;
      default:
        break;
    }
  }

  createSpritePerformance(sprite) {
    switch(sprite) {
      case 0:
        return ' ';
      case 1:
        return '╔';
      case 2:
        return '╗';
      case 3:
        return '╝';
      case 4:
        return '╚';
      case 5: 
        return '═';
      case 6:
          return '║';
      default:
        break;
    }
  }
};

// const colors = {
//   whiteFg: '\u001b[38;5;15m',
//   whiteBg: '\u001b[48;5;15m',
//   redFg: '\u001b[38;5;160m',
//   redBg: '\u001b[48;5;160m',
//   greenFg: '\u001b[38;5;70m',
//   greenBg: '\u001b[48;5;70m',
//   brownFg: '\u001b[38;5;130m',
//   brownBg: '\u001b[48;5;130m',
//   greyFg: '\u001b[38;5;243m',
//   greyBg: '\u001b[48;5;243m',
//   reset: '\u001b[0m'
// }
module.exports = Map;