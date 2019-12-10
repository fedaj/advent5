const Add = require("./Add");
const Multiply = require("./Multiply");
const Input = require("./Input");
const Output = require("./Output");
const JumpIfTrue = require("./JumpIfTrue");
const JumpIfFalse = require("./JumpIfFalse");
const LessThan = require("./LessThan");
const Equals = require("./Equals");
const Halt = require("./Halt");

const ADD = 1;
const MULTIPLY = 2;
const INPUT = 3;
const OUTPUT = 4;
const JUMP_IF_TRUE = 5;
const JUMP_IF_FALSE = 6;
const LESS_THAN = 7;
const EQUALS = 8;
const HALT = 99;
const MODE_IMMEDIATE = 1;

class InstructionFactory {
    constructor(memory, input, output) {
        this.memory = memory;
        this.input = input;
        this.output = output;
        this.instruction = Halt;
    }

    getInstruction(instructionPointer) {
        let opcode = this._getOpcode(instructionPointer);
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
            case JUMP_IF_TRUE:
                this.instruction = JumpIfTrue;
                break;
            case JUMP_IF_FALSE:
                this.instruction = JumpIfFalse;
                break;
            case LESS_THAN:
                this.instruction = LessThan;
                break;
            case EQUALS:
                this.instruction = Equals;
                break;
            case HALT:
                this.instruction = Halt;
                break;
            default:
                throw new Error("Unsupported opcode: " + opcode);
        }

        return new this.instruction(instructionPointer, devices);
    }

    _getOpcode(instructionPointer) {
        this.memory.setMode(MODE_IMMEDIATE);
        let opcodeAndModes = this.memory.read(instructionPointer);
        let opcode = opcodeAndModes % 100;
        return opcode;
    }
}

module.exports = InstructionFactory;