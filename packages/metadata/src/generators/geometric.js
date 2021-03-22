const tinycolor = require("tinycolor2");
const extract = require('../lib/extractParameters')

/**
 * @param {CanvasRenderingContext2D} canvas 
 * @param {boolean[][]} square
 * @param {Function} randomNess 
 */
module.exports = function (canvas, square, randomNess) {

  const bytes = extract.bytes8(square);
  const bgColorTone = (360 / 16) * (bytes[0] & 0xF0) >> 4;
  const bgColorSat = 25 + (70 / 16) * (bytes[0] & 0x0F);
  const radius = (50 / 16) * ((bytes[1] & 0xF0) >> 4);
  const radiusVariance = (2 / 16) * ((bytes[1] & 0x0F));
  const shape = ((bytes[2] & 0xF0) >> 4) & 0x01 ? 'circle' : 'rect';
  const iterations = 10 + ((bytes[2] & 0x0F) << 2)

  console.log(bgColorTone, bgColorSat, radius, radiusVariance, shape, iterations);

  const bgColor = tinycolor(`hsl(${bgColorTone}, ${bgColorSat}%, 75%`);
  const fgColor = bgColor.clone().spin(135);
  const strokeColor = fgColor.clone().spin(135);
  const ctx = canvas.getContext('2d')
  ctx.fillStyle = bgColor.toHexString();
  ctx.fillRect(0, 0, 800, 800)

  for (let i = 0; i < iterations; i++) {
    const x = Math.floor(800 * randomNess());
    const y = Math.floor(800 * randomNess());
    const size = radius + (10 * ((randomNess() * 10) ^ radiusVariance));
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