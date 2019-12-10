const MODE_POSITION = 0;
const MODE_IMMEDIATE = 1;
const VALID_MODES = [
    MODE_IMMEDIATE,
    MODE_POSITION
];

class Memory {
    constructor() {
        this.bytes = new Map();
        this.mode = MODE_IMMEDIATE;
    }

    clear() {
        this.bytes.clear();
    }

    load(address, data) {
        if (address < 0) {
            this._invalidAddress(address);
        }

        if (data.length == 0) {
            this._invalidData();
        }

        for (let i = address; i < address + data.length; i++) {
            this._writeDirect(i, data[i]);
        }
    }

    dump() {
        return [...this.bytes.values()];
    }

    get size() {
        return this.bytes.size;
    }

    setMode(mode) {
        if (!VALID_MODES.includes(mode)) {
            throw new Error("Invalid mode: ", mode);
        }

        this.mode = mode;

        return this.mode;
    }

    read(address) {
        if (this.mode == MODE_IMMEDIATE) {
            return this._readDirect(address);
        } else {
            return this._readIndirect(address);
        }
    }

    write(address, data) {
        if (this.mode == MODE_IMMEDIATE) {
            return this._writeDirect(address, data);
        } else {
            return this._writeIndirect(address, data);
        }

    }

    _readDirect(address) {
        return this.bytes.get(address);
    }

    _readIndirect(address) {
        let dataAddress = this.bytes.get(address);

        return this._readDirect(dataAddress);
    }

    _writeDirect(address, data) {
        this.bytes.set(address, Number(data));

        return this._readDirect(address);
    }

    _writeIndirect(address, data) {
        let dataAddress = this.bytes.get(address);

        return this._writeDirect(dataAddress, data);
    }

    _invalidAddress(address) {
        throw new Error("Invalid address: " + address);
    }

    _invalidData() {
        throw new Error("Invalid Data");
    }
}

module.exports = Memory;