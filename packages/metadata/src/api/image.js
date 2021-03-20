const Square = require('../square');

const { createCanvas } = require('canvas')
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
  const square = Square.fromBytes(Buffer.from(id, 'hex'));
  const canvas = paint(square);
  //const stream = canvas.createPNGStream();

  //res.json({ id })
  canvas.toBuffer((err, buf) => {
    res.setHeader('content-type', 'image/png')
    res.send(buf);
  })
}
