class Instruction {

    constructor(programCounter, memory, memoryMode, numOperands, continueExecution) {
        this.memoryMode = memoryMode;
        this.numOperands = numOperands;
        this.continueExecution = continueExecution;
        this.resultAddress = programCounter + this.numOperands + 1;
        this.operands = [];

        this._setupMemory(memory);

        for (let i = 1; i <= this.numOperands; i++) {
            let operandAddress = programCounter + i;
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

    _setupMemory(memory) {
        this.memory = memory;
        this.memory.setMode(this.memoryMode);
    }

    _saveResult(result) {
        this.memory.write(this.resultAddress, result);
    }
}

module.exports = Instruction;