const MODE_DIRECT = 1;
const MODE_INDIRECT = 2;
const VALID_MODES = [
    MODE_DIRECT,
    MODE_INDIRECT
];
const START_ADDRESS = 0;

class Memory {
    constructor() {
        this.bytes = new Map();
        this.mode = MODE_DIRECT;
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

    setMode(mode) {
        if (!VALID_MODES.includes(mode)) {
            throw new Error("Invalid mode");
        }

        this.mode = mode;

        return this.mode;
    }

    read(address) {
        if (this.mode == MODE_DIRECT) {
            return this._readDirect(address);
        } else {
            return this._readIndirect(address);
        }
    }

    write(address, data) {
        if (this.mode == MODE_DIRECT) {
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
        this.bytes.set(address, data);

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