class Animal {
    constructor(x_pos, y_pos, type, sprite) {
        this.current_x_pos = x_pos;
        this.current_y_pos = y_pos;
        this.type = type;
        this.sprite = sprite;
        this.sex = this.setSex(); // female 0, male 1
    }

    getChoice () {
        return Math.floor(Math.random() * Math.floor(2));
    }

    /**
     * Male = 0; Female = 1;
     */
    setSex () {
        return this.getChoice();
    }

}

module.exports = Animal;