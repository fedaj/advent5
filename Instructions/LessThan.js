const Instruction = require("./Instruction");

const INSTRUCTION_SIZE = 4;

class LessThan extends Instruction {
    constructor(instructionPointer, devices) {
        let numOperands = 2;
        super(instructionPointer, devices.memory, numOperands);

        this.instructionPointer = instructionPointer;
    }

    execute() {
        let result = this.operands[0] < this.operands[1] ? 1 : 0;
        this._saveResult(result);

        return this.instructionPointer + INSTRUCTION_SIZE;
    }
}

module.exports = LessThan;