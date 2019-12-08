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

        for (let i = 1; i <= this.numOperands; i++) {
            let operandAddress = programCounter + i;
            this.memory.setMode(modes[i - 1]);
            let operand = Number(this.memory.read(operandAddress));
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
        let modes = opcodeAndModes.slice(0, -2).split("").map((char) => Number(char));
        if (modes.length < this.numOperands) {
            let missingModesAmount = this.numOperands - modes.length;
            for (let i = modes.length; i < missingModesAmount; i++) {
                modes.push(MODE_POSITION);
            }
        }

        return modes;
    }

    _saveResult(result) {
        this.memory.setMode(MODE_POSITION);
        this.memory.write(this.resultAddress, result);
    }
}

module.exports = Instruction;