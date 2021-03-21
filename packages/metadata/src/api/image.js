const Square = require('../square');
const seedrandom = require('seedrandom');
const { createCanvas } = require('canvas')
var tinycolor = require("tinycolor2");

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

function fancy(square, randomNess) {

  const bgColorTone = Square.bitsToByte([
    square[0][0],
    square[0][1],
    square[0][2],
    square[0][3],
  ]);

  const bgColorRot = Square.bitsToByte([
    square[0][4],
    square[0][5],
    square[0][6],
    square[0][7],
  ]);

  const radius = Square.bitsToByte([
    square[1][0],
    square[1][1],
    square[1][2],
    square[1][3],
  ]);

  const shape = square[2][0] == true ? "circle" : "rect";

  const iterations = Math.round(100 * randomNess());

  const bgColor = tinycolor(`hsl(${bgColorTone}, ${bgColorRot}%, 75%`);
  const fgColor = bgColor.clone().spin(135);
  const strokeColor = fgColor.clone().spin(135);
  const canvas = createCanvas(800, 800)
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = bgColor.toHexString();
  ctx.fillRect(0, 0, 800, 800)

  for (let i = 0; i < iterations; i++) {
    const x = Math.floor(800 * randomNess());
    const y = Math.floor(800 * randomNess());
    const size = radius + (10 - 20 * randomNess());
    ctx.fillStyle = fgColor.toHexString();
    ctx.strokeStyle = strokeColor.toHexString();
    ctx.lineWidth = 4;
    if (shape == "circle") {
      ctx.beginPath()
      ctx.ellipse(x, y, size, size, 0, Math.PI * 2, 0, 1);
    } else {
      ctx.fillRect(x, y, size, size);
      ctx.strokeRect(x, y, size, size);
    }

    ctx.fill()
    ctx.stroke();
  }
  return canvas;
}

module.exports = (req, res) => {
  const id = req.query.id;

  const square = Square.fromBytes(Buffer.from(id, 'hex'));
  let canvas
  if (req.query.render == 'fancy') {
    canvas = fancy(square, seedrandom(id))
  } else {
    canvas = paint(square);
  }

  canvas.toBuffer((err, buf) => {
    res.setHeader('content-type', 'image/png')
    res.send(buf);
  })
}

