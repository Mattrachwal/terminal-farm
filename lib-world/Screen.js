class Screen {
    constructor () {
        
    }

    arrayToString (state) {
        
    }
    /**
     * @param {*} state
     * The screen is a string formatted to create a grid using newlines.
     */
    render (state) {
        //process.stdout.write('\x1Bc'); 
        console.clear();
        process.stdout.cursorTo(0);
        process.stdout.write(state.screen);
    }

    bufferToScreen (string) {
        process.stdout.cursorTo(0);
        console.clear();
        var writeBuffer = Buffer(string);
        process.stdout.write(writeBuffer);
    }
}

module.export = Screen;