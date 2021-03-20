const { createCanvas } = require('canvas')

function byte2bin(byte) {
  const binary = (byte >>> 0).toString(2);
  const padded = String("0".repeat(8) + binary).slice(-8);
  return padded;
}

function fromBytes(id) {
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

function paint(square) {
  const canvas = createCanvas(800, 800)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, 800, 800)
  const pad = 15;
  for (let y = 0; y < square.length; y++) {
    for (let x = 0; x < square.length; x++) {
      ctx.fillStyle = square[y][x] ? '#47dcfc' : 'white'
      ctx.fillRect(x * 100 + pad, y * 100 + pad, 100 - pad, 100 - pad);
    }
  }

  return canvas;
}

module.exports = (req, res) => {
  const id = req.query.id;
  const square = fromBytes(Buffer.from(id, 'hex'));
  const canvas = paint(square);
  //const stream = canvas.createPNGStream();

  //res.json({ id })
  canvas.toBuffer((err, buf) => {
    res.setHeader('content-type', 'image/png')
    res.send(buf);
  })
}
