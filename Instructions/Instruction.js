const MODE_POSITION = 0;
const MODE_IMMEDIATE = 1;

class Instruction {

    constructor(
        instructionPointer,
        memory,
        numOperands
    ) {
        this.memory = memory;
        this.numOperands = numOperands;
        this.resultAddress = instructionPointer + this.numOperands + 1;
        this.operands = [];

        let modes = this._getOperationModes(instructionPointer);

        for (let i = 0; i < this.numOperands; i++) {
            let operandAddress = instructionPointer + i + 1; // skip opcode
            this.memory.setMode(modes[i]);
            let operand = this.memory.read(operandAddress);
            this.operands.push(operand);
        }
    }

    execute() {
        return null;
    }

    _getOperationModes(instructionPointer) {
        this.memory.setMode(MODE_IMMEDIATE);
        let opcodeAndModes = this.memory.read(instructionPointer);
        let modes = [];
        for (let i = this.numOperands; i > 0; i--) {
            let mask = Math.pow(10, i + 1);
            let mode = Math.floor(opcodeAndModes / mask);
            modes.unshift(mode);
            opcodeAndModes = opcodeAndModes % mask;
        }

        return modes;
    }

    _saveResult(result) {
        this.memory.setMode(MODE_POSITION);
        this.memory.write(this.resultAddress, result);
    }
}

module.exports = Instruction;