import * as Square from '../lib/square';

const mx4=
`00010000
00010000
00010000
00010000
00010000
00010000
00010000
00010000`

const mx5=
`10000000
00000000
00000000
00000000
00000000
00000000
00000000
0000000`

const square0 = Square.fromBytes(Buffer.from("0000000200000004", 'hex'));
Square.print(square0)

// const sq4 = Square.fromText(mx4);
// const sq5 = Square.fromText(mx5);

// const combined = Square.operate([sq4, sq5], Square.or);
// Square.print(combined)

// const b4 = Square.bitsToBytes(Square.toBinArray(sq4));
// const b5 = Square.bitsToBytes(Square.toBinArray(sq5));
// const bc = Square.bitsToBytes(Square.toBinArray(combined));

// console.log("4", b4.toString("hex"))
// console.log("5", b5.toString("hex"))
// console.log("c", bc.toString("hex"))

// for (let i=0; i<10; i++) {
//   const field = 1 << i;
//   console.log(field);
// }

// const n1 = 0x10101010ff101010;
// const n2 = 0x00000000ff000000;
// const n3 = n1 || n2;

// console.log("b", n3.toString(16));