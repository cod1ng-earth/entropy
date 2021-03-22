/**
 * drawLineCluster function:
 * Draws a cluster of lines to the screen around a particular point.
 * Length, direction and color of lines are dictated by randomness. 
 * Parameters: 
 * strokeColoring controls the color palette of a line cluster, can be set to 1, 2, or 3
 * rand_line_dir_style controls the direction of lines, can be set to 1, 2, 3, or 4
 */
function drawLineCluster(context, getRandomInt, center_x, center_y, strokeColoring, rand_line_dir_style, strokeLength = 150) {
  //First, a loop to control the number of lines in this cluster, so each cluster has a lot of lines in it
  for (let cycle_nums = 0; cycle_nums < 20; cycle_nums++) {

    //These variables control the color gradient for this cluster
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {

        //Let's start drawing! 
        context.beginPath();

        //Here we're shifting our center point for a bit of randomness
        switch (rand_line_dir_style) {
          case 1:
            //pompom
            context.moveTo(center_x, center_y);
            break;
          case 2:
            //Uni-directional
            context.moveTo(center_x + getRandomInt(strokeLength), center_y + getRandomInt(strokeLength));
            break;
          case 3:
            //Fountain splay down
            var plusOrMinus = getRandomInt(1) == 0 ? -1 : 1;
            context.moveTo(center_x + (plusOrMinus * getRandomInt(strokeLength)), center_y + getRandomInt(strokeLength));
            break;
          case 4:
            //Fountain v.2
            var plusOrMinusx = getRandomInt(1) == 0 ? -1 : 1;
            var plusOrMinusy = getRandomInt(1) == 0 ? -1 : 1;
            var randomLengthMax = getRandomInt(strokeLength);//make this number bigger for longer lines
            context.moveTo(center_x + (plusOrMinusx * getRandomInt(randomLengthMax)), center_y + (plusOrMinusy * getRandomInt(randomLengthMax)));
            break;

          default:
            //Just draw pompom
            context.moveTo(center_x, center_y);
        }



        //Use random number to generate length of line
        var length = getRandomInt(strokeLength);
        //Use another random number to get the angle of the line
        var angle = getRandomInt(360);

        //Finding an end point on a perimeter around the point
        plusOrMinus = getRandomInt(1) == 0 ? -1 : 1;
        var new_x = center_x + (length * Math.cos(angle));
        var new_y = center_y + plusOrMinus * (length * Math.sin(angle));

        //Finally draw that line – phew!
        context.lineTo(new_x, new_y);

        //Let's stroke it with a color gradient, also random, just playing with 4 different 
        //hard coded color gradients here but of course we could make randomness drive those color gradiants
        switch (strokeColoring) {
          case 1:
            //Turquoise
            context.strokeStyle = `rgb(0,${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * j)})`; break;
          case 2:

            //Black and white
            context.strokeStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)})`;

            break;
          case 3:
            //Purples
            context.strokeStyle = `rgb(${Math.floor(255 - 42.5 * i)},0,${Math.floor(255 - 42.5 * j)})`;
            break;
          case 4:
            //Not sure what color comes of this
            context.strokeStyle = `rgb(200, ${Math.floor(255 - 42.5 * i)}, ${Math.floor(255 - 42.5 * j)})`;
            break;
          default:
            //Black and white by default
            context.strokeStyle = `rgb(${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)},${Math.floor(255 - 42.5 * i)})`;
        }
        context.stroke();
      }
    }
  }
}

module.exports = (canvas, square, randomNess) => {

  function getRandomInt(max) {
    return Math.floor(randomNess() * Math.floor(max));
    //return
  }

  const context = canvas.getContext('2d');
  context.fillStyle = "black";
  context.fillRect(0, 0, canvas.width, canvas.height);

  // const center_x = canvas.width / 2;
  // const center_y = canvas.height / 2;

  //Pull together a grid of points that represent our matrix
  const tile_rows = 8;
  var tile_cols = 8;
  const tile_width = canvas.width / tile_cols;
  const tile_height = canvas.height / tile_rows;

  for (let row = 0; row < tile_rows; row++) {
    for (let col = 0; col < tile_cols; col++) {
      const pnt_x = (tile_width * col) + (tile_width / 2);
      const pnt_y = (tile_height * row) + (tile_height / 2);

      //Setting NUMBER OF COLORS with rand_stroke_color parameter - can be 1,2,3 or 4
      //one color:
      //var rand_stroke_color =3;
      //two colors:
      //var rand_stroke_color =getRandomInt(2)+1;
      //three colors:
      const rand_stroke_color = getRandomInt(3) + 1;

      //Setting LINE DIRECTION with rand_line_dir_style parameter - can be 1,2,3 or 4
      const rand_line_dir_style = getRandomInt(4) + 1;
      //Calling our line cluster function for each of our tiles!
      drawLineCluster(context, getRandomInt, pnt_x, pnt_y, rand_stroke_color, rand_line_dir_style, 100);
    }
  }

}





