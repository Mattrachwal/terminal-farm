class Screen {
    constructor () {}

    draw (string) {
        process.stdout.cursorTo(0);
        console.clear();
        var writeBuffer = Buffer.from(string);
        process.stdout.write(writeBuffer);
    }
}

module.exports = Screen;