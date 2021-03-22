const Square = require('./square');

/**
 * @param {boolean[][]} square 
 */
module.exports = {
  bytes8: function (square) {
    return square.map(row => {
      return Square.bitsToByte(row)
    });
  }
}



