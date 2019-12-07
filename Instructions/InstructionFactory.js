const Add = require("./Add");
const Multiply = require("./Multiply");
const Halt = require("./Halt");

const ADD = 1;
const MULTIPLY = 2;
const HALT = 99;
const MODE_DIRECT = 1;

class InstructionFactory {
    constructor(memory) {
        this.memory = memory;
        this.instruction = Halt;
    }

    getInstruction(programCounter) {
        let opcode = this._getOpcode(programCounter);

        switch (opcode) {
            case ADD:
                this.instruction = Add;
                break;
            case MULTIPLY:
                this.instruction = Multiply;
                break;
            case HALT:
                this.instruction = Halt;
                break;
            default:
                throw new Error("Unsupported opcode: " + opcode);
        }

        return new this.instruction(programCounter, this.memory);
    }

    _getOpcode(programCounter) {
        this.memory.setMode(MODE_DIRECT);
        return this.memory.read(programCounter);
    }
}

module.exports = InstructionFactory;