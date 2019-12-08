const Instruction = require("./Instruction");

class Output extends Instruction {
    constructor(programCounter, devices) {
        let numOperands = 1;
        let continueExecution = true;

        this.outputDevice = devices.output;

        super(programCounter, devices.memory, numOperands, continueExecution);
    }

    execute() {
        this.outputDevice.write(this.operands[0]);

        return this.continueExecution;
    }
}

module.exports = Output;