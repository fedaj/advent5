const Add = require("./Add");
const Multiply = require("./Multiply");
const Input = require("./Input");
const Output = require("./Output");
const Halt = require("./Halt");

const ADD = 1;
const MULTIPLY = 2;
const INPUT = 3;
const OUTPUT = 4;
const HALT = 99;
const MODE_IMMEDIATE = 1;

class InstructionFactory {
    constructor(memory, input, output) {
        this.memory = memory;
        this.input = input;
        this.output = output;
        this.instruction = Halt;
    }

    getInstruction(programCounter) {
        let opcode = this._getOpcode(programCounter);
        let devices = { memory: this.memory };

        switch (opcode) {
            case ADD:
                this.instruction = Add;
                break;
            case MULTIPLY:
                this.instruction = Multiply;
                break;
            case INPUT:
                this.instruction = Input;
                devices.input = this.input;
                break;
            case OUTPUT:
                this.instruction = Output;
                devices.output = this.output;
                break;
            case HALT:
                this.instruction = Halt;
                break;
            default:
                throw new Error("Unsupported opcode: " + opcode);
        }

        return new this.instruction(programCounter, devices);
    }

    _getOpcode(programCounter) {
        this.memory.setMode(MODE_IMMEDIATE);
        let opcodeAndModes = this.memory.read(programCounter);
        let opcode = opcodeAndModes % 100;
        return opcode;
    }
}

module.exports = InstructionFactory;