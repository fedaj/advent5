const Instruction = require("./Instruction");

class Output extends Instruction {
    constructor(programCounter, devices) {
        let numOperands = 1;
        let continueExecution = true;

        super(programCounter, devices.memory, numOperands, continueExecution);

        this.outputDevice = devices.output;
    }

    execute() {
        this.outputDevice.write(this.operands[0]);

        return this.continueExecution;
    }

    get size() {
        return 2; // opcode + operand
    }
}

module.exports = Output;