const Instruction = require("./Instruction");

/* FIXME: importar constantes de módulo Memory */
const MODE_DIRECT = 1;

class Halt extends Instruction {
    constructor(programCounter, memory) {
        let numOperands = 0;
        let continueExecution = false;
        let memoryMode = MODE_DIRECT;
        super(programCounter, memory, memoryMode, numOperands, continueExecution);
    }

    execute() {
        return this.continueExecution;
    }
}

module.exports = Halt;