const Memory = require("./Memory");
const InstructionFactory = require("./Instructions/InstructionFactory");

/* FIXME: importar constantes de módulo Memory */
const START_ADDRESS = 0;

class Computer {
    constructor(memory = null, instructionFactory = null) {
        this.memory = memory ? memory : new Memory();
        this.instructionFactory = instructionFactory ?
            instructionFactory :
            new InstructionFactory(this.memory);
    }

    computeProgram(input) {
        let program = input.slice(0);
        let programCounter = 0;

        this.memory.clear();
        this.memory.load(START_ADDRESS, program);

        let continueExecution = true;

        while (continueExecution) {
            let instruction = this.instructionFactory.getInstruction(programCounter);
            continueExecution = instruction.execute();
            programCounter += instruction.size;
        }

        return this._getOutput();
    }

    _getOutput() {
        return this.memory.read(START_ADDRESS);
    }
}

module.exports = Computer;