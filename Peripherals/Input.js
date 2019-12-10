class Input {
    constructor() {
        this.input = [1];
    }

    read() {
        return this.input.pop();
    }
}

module.exports = Input;