const Square = require('../lib/square');
const seedrandom = require('seedrandom');
const { createCanvas } = require('canvas')
const generators = require('../generators');

module.exports = (req, res) => {
  const id = req.query.id;

  const square = Square.fromBytes(Buffer.from(id, 'hex'));
  const canvas = createCanvas(800, 800)
  const randomNess = seedrandom(id);

  const renderer = req.query.render ? generators[req.query.render] : generators.matrix;

  renderer(canvas, square, randomNess);

  canvas.toBuffer((err, buf) => {
    res.setHeader('content-type', 'image/png')
    res.send(buf);
  })
}

