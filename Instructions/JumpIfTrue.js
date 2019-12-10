const Instruction = require("./Instruction");

const INSTRUCTION_SIZE = 3;

class JumpIfTrue extends Instruction {
    constructor(instructionPointer, devices) {
        let numOperands = 2;
        super(instructionPointer, devices.memory, numOperands);

        this.instructionPointer = instructionPointer;
    }

    execute() {
        let instructionPointer = (this.operands[0] != 0) ?
            this.operands[1] :
            this.instructionPointer + INSTRUCTION_SIZE;

        return instructionPointer;
    }
}

module.exports = JumpIfTrue;