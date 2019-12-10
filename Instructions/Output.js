const Instruction = require("./Instruction");

const INSTRUCTION_SIZE = 2;

class Output extends Instruction {
    constructor(instructionPointer, devices) {
        let numOperands = 1;
        super(instructionPointer, devices.memory, numOperands);

        this.outputDevice = devices.output;
        this.instructionPointer = instructionPointer;
    }

    execute() {
        this.outputDevice.write(this.operands[0]);

        return this.instructionPointer + INSTRUCTION_SIZE;
    }
}

module.exports = Output;