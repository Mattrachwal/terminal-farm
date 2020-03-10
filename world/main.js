// Main file for running the simulation
const MapBuilder = require('./MapBuilder');
const Screen = require('./Screen');
const smallMap = require('./maps/smallMap');
const manager = {
  map: new MapBuilder(smallMap),
  screen: new Screen(),
};
function main () {
  manager.map.build(true);
  manager.map.mapToString()
  manager.screen.draw(manager.map.mapString);
}
setTimeout(function(){ main() }, 100);

