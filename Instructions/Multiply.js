const Instruction = require("./Instruction");

class Multiply extends Instruction {
    constructor(programCounter, devices) {
        let numOperands = 2;
        let continueExecution = true;
        super(programCounter, devices.memory, numOperands, continueExecution);
    }

    execute() {
        let result = this.operands[0] * this.operands[1];
        this._saveResult(result);

        return this.continueExecution;
    }
}

module.exports = Multiply;