const Instruction = require("./Instruction");

class Input extends Instruction {
    constructor(programCounter, devices) {
        let numOperands = 0;
        let continueExecution = true;

        super(programCounter, devices.memory, numOperands, continueExecution);

        this.inputDevice = devices.input;
    }

    execute() {
        let result = this.inputDevice.read();
        this._saveResult(result);

        return this.continueExecution;
    }
}

module.exports = Input;