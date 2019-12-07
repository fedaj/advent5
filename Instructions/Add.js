const Instruction = require("./Instruction");

/* FIXME: importar constantes de módulo Memory */
const MODE_INDIRECT = 2;

class Add extends Instruction {
    constructor(programCounter, memory) {
        let numOperands = 2;
        let continueExecution = true;
        let memoryMode = MODE_INDIRECT;
        super(programCounter, memory, memoryMode, numOperands, continueExecution);
    }

    execute() {
        let result = this.operands[0] + this.operands[1];
        this._saveResult(result);

        return this.continueExecution;
    }
}

module.exports = Add;