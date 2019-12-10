const Memory = require("./Components/Memory");
const Input = require("./Peripherals/Input");
const Output = require("./Peripherals/Output");
const InstructionFactory = require("./Instructions/InstructionFactory");

/* FIXME: importar constantes de módulo Memory */
const START_ADDRESS = 0;

class Computer {
    constructor(
        memory = null,
        input = null,
        output = null,
        instructionFactory = null
    ) {
        this.memory = memory ? memory : new Memory();
        this.input = input ? input : new Input();
        this.output = output ? output : new Output();
        this.instructionFactory = instructionFactory ?
            instructionFactory :
            new InstructionFactory(this.memory, this.input, this.output);
    }

    computeProgram(program) {
        let instructionPointer = 0;

        this.memory.clear();
        this.memory.load(START_ADDRESS, program);

        while (instructionPointer >= 0) {
            let instruction = this.instructionFactory.getInstruction(instructionPointer);
            instructionPointer = instruction.execute();
        }

        return {
            "memory": this.memory.dump(),
            "output": this.output.dump()
        };
    }
}

module.exports = Computer;