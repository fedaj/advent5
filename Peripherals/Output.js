class Output {
    constructor() {
        this.output = [];
    }

    write(value) {
        this.output.push(value);
    }

    dump() {
        return this.output;
    }
}

module.exports = Output;