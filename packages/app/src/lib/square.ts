export type Square = Array<Array<boolean>>;
export type Operation = (y: boolean, x: boolean) => boolean;
export interface Entropy {
    x: number[];
    y: number[];
    s: { x: number, y: number };
    sq: { x: number, y: number };
    sym: Record<number, number>;
    symbolicEntropy: number;
}

export function empty(size: number): Square {
    let square: Square = new Array<Array<boolean>>(size);
    for (let y = size; y-- > 0;) {
        square[y] = new Array<boolean>(size);
        for (let x = size; x-- > 0;) {
            square[y][x] = false;
        }
    }
    return square;
}

export function entropy(square: Square): Entropy {
    let entropies = {
        x: new Array<number>(square.length),
        y: new Array<number>(square.length),
        s: { x: 0, y: 0 },
        sq: { x: 0, y: 0 },
        sym: {} as Record<number, number>,
        symbolicEntropy: 0
    };

    for (let y = 0; y < square.length; y++) {
        let entropyX = 0;
        let entropyY = 0;
        for (let x = 0; x < square.length; x++) {
            if (x > 0) {
                entropyX += square[y][x] === square[y][x - 1] ? 0 : 1;
                entropyY += square[x][y] === square[x - 1][y] ? 0 : 1;
            }
        }
        entropies.x[y] = entropyX;
        entropies.y[y] = entropyY;
    }


    for (let i = 0; i < square.length; i++) {
        entropies.sym[i] = 0;
    }
    for (let i = 0; i < square.length; i++) {
        entropies.s.x += entropies.x[i] === 0 ? 0 : entropies.x[i] * Math.log2(entropies.x[i]);
        entropies.s.y += entropies.y[i] === 0 ? 0 : entropies.y[i] * Math.log2(entropies.y[i]);
        entropies.sq.x += entropies.x[i] * Math.sqrt(entropies.x[i]);
        entropies.sq.y += entropies.y[i] * Math.sqrt(entropies.y[i]);
        entropies.sym[entropies.x[i]]++;
        entropies.sym[entropies.y[i]]++;
    }
    let symbolicEntropy = 0;
    let q = 1;
    for (let i = 0; i < square.length; i++) {
        symbolicEntropy += entropies.sym[i] > 0 ? q++ * i : 0;
    }
    entropies.symbolicEntropy = symbolicEntropy;
    return entropies;
}

export function operate(squares: Square[], op: Operation): Square {
    const size = squares[0].length;
    const result = squares[0];
    for (let y = size; y-- > 0;) {
        for (let x = size; x-- > 0;) {
            for (let square of squares.slice(1)) {
                result[y][x] = op(result[y][x], square[y][x]);
            }

        }
    }
    return result;
}



export function fromBytes(id: Buffer): Square {

    let res = "";
    for (let byte of id) {
        res += byte2bin(byte);
    }


    const size = Math.floor(Math.sqrt(res.length));
    const square = new Array<Array<boolean>>(size);
    for (let y = 0; y < size; y++) {
        square[y] = new Array<boolean>(size);
        for (let x = 0; x < size; x++) {
            square[y][x] = res[y * size + x] === '1' ? true : false;
        }
    }
    return square;
}

export function fromText(text: string): Square {
    const lines = text.trim().split("\n");
    const size = lines[0].length
    const square = empty(size);
    for (let y = 0; y < size; y++) {
        for (let x = 0; x < size; x++) {
            square[y][x] = lines[y].trim()[x] === "1";
        }
    }
    return square;
}

export const and: Operation = (y, x) => y && x;
export const or: Operation = (y, x) => y || x;
export const xor: Operation = (y, x) => x == y ? false : true;

export function print(square: Square) {
    for (let y = 0; y < square.length; y++) {
        let row = '';
        for (let x = 0; x < square[y].length; x++) {
            row += (square[y][x] === true ? '█' : '_');
        }
        console.log(row);
    }
}

export function toBinArray(square: Square): number[] {
    const ret = [];
    for (let y = 0; y < square.length; y++) {
        for (let x = 0; x < square.length; x++) {
            ret.push(square[y][x] ? 1 : 0);
        }
    }
    return ret;
}

export function byte2bin(byte: number): string {
    const binary = (byte >>> 0).toString(2);
    const padded = String("0".repeat(8) + binary).slice(-8);
    return padded;
}

export function bitsToBytes(bits: number[]): Buffer {
    const byteLength = bits.length / 8;

    const ret = Buffer.alloc(byteLength);
    for (let b = 0; b < byteLength; b++) {
        let byte = 0x0;
        for (let bt = 0; bt < 8; bt++) {
            if (bits[8 * b + bt] === 1) {
                byte |= (128 >> bt);
            }
        }
        ret[b] = byte;
    }
    return ret;
}

export function toHex(square: Square) {
    const hex = Buffer.from(bitsToBytes(toBinArray(square))).toString('hex');
    return hex;
}