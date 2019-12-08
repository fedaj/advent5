const MODE_POSITION = 0;
const MODE_IMMEDIATE = 1;

class Instruction {

    constructor(
        programCounter,
        memory,
        numOperands,
        continueExecution
    ) {
        this.memory = memory;
        this.numOperands = numOperands;
        this.continueExecution = continueExecution;
        this.resultAddress = programCounter + this.numOperands + 1;
        this.operands = [];

        let modes = this._getOperationModes(programCounter);

        for (let i = 0; i < this.numOperands; i++) {
            let operandAddress = programCounter + i + 1; // skip opcode
            this.memory.setMode(modes[i]);
            let operand = this.memory.read(operandAddress);
            this.operands.push(operand);
        }
    }

    get size() {
        return this.numOperands + 2; // opcode + operands + result memory positions
    }

    execute() {
        return null;
    }

    _getOperationModes(programCounter) {
        this.memory.setMode(MODE_IMMEDIATE);
        let opcodeAndModes = this.memory.read(programCounter);
        let modes = [];
        for (let i = 2; i < this.numOperands + 2; i++) {
            let mask = Math.pow(10, i);
            modes.push(Math.floor(opcodeAndModes / mask));
        }

        return modes;
    }

    _saveResult(result) {
        this.memory.setMode(MODE_POSITION);
        this.memory.write(this.resultAddress, result);
    }
}

module.exports = Instruction;