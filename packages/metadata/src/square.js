export function byte2bin(byte) {
  const binary = (byte >>> 0).toString(2);
  const padded = String("0".repeat(8) + binary).slice(-8);
  return padded;
}

export function fromBytes(id) {
  let res = "";
  for (let byte of id) {
    res += byte2bin(byte);
  }

  const size = Math.sqrt(res.length);
  const square = new Array(size);
  for (let y = 0; y < size; y++) {
    square[y] = new Array(size);
    for (let x = 0; x < size; x++) {
      square[y][x] = res[y * size + x] === '1' ? true : false;
    }
  }
  return square;
}