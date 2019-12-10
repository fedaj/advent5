class Input {
    constructor(values) {
        this.input = values;
    }

    read() {
        return this.input.pop();
    }
}

module.exports = Input;