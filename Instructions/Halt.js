const Instruction = require("./Instruction");

class Halt extends Instruction {
    constructor(instructionPointer, devices) {
        let numOperands = 0;
        super(instructionPointer, devices.memory, numOperands);
    }

    execute() {
        return -1;
    }
}

module.exports = Halt;