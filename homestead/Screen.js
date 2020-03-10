class Screen {
    constructor () {
        
    }

    renderFrame(frameArray) {
        let frame = '';
        for ( var i = 0; i < frameArray.length; i++ ) {
            for (var j = 0; j < frameArray[i].length; j++ ) {
                frame += frameArray[i][j];
            }
            frame += '\n';
        }
        return frame;
     }

    draw (frame) {
        //process.stdout.write('\x1Bc'); 
        console.clear();
        process.stdout.cursorTo(0);
        process.stdout.write(frame);
    }
}

module.exports = Screen;