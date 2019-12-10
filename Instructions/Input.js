const Instruction = require("./Instruction");

const INSTRUCTION_SIZE = 2;

class Input extends Instruction {
    constructor(instructionPointer, devices) {
        let numOperands = 0;
        super(instructionPointer, devices.memory, numOperands);

        this.inputDevice = devices.input;
        this.instructionPointer = instructionPointer;
    }

    execute() {
        let result = this.inputDevice.read();
        this._saveResult(result);

        return this.instructionPointer + INSTRUCTION_SIZE;
    }
}

module.exports = Input;