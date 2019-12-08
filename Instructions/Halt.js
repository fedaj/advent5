const Instruction = require("./Instruction");

class Halt extends Instruction {
    constructor(programCounter, devices) {
        let numOperands = 0;
        let continueExecution = false;
        super(programCounter, devices.memory, numOperands, continueExecution);
    }

    execute() {
        return this.continueExecution;
    }

    get size() {
        return 1; // opcode without parameters
    }
}

module.exports = Halt;