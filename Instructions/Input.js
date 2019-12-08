const Instruction = require("./Instruction");

class Input extends Instruction {
    constructor(programCounter, devices) {
        let numOperands = 0;
        let continueExecution = true;

        this.inputDevice = devices.input;

        super(programCounter, devices.memory, numOperands, continueExecution);
    }

    execute() {
        let result = this.inputDevice.read();
        this._saveResult(result);

        return this.continueExecution;
    }
}

module.exports = Input;