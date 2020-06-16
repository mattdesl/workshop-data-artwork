/* eslint-disable */

let font;

// preload a font
function preload() {
  font = loadFont("assets/SourceCodePro-Regular.ttf");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // low frame per second instead of 60 FPS
  frameRate(5);

  const H = hour();
  const M = minute();
  const S = second();

  // setup colors and styles
  background("black");
  stroke("white");
  noFill();

  // center of screen
  const x = width / 2;
  const y = height / 2;

  // create a 3x2 grid (i.e. 5 points)
  const dim = min(width, height);
  const margin = dim * 0.4;
  const points = [];
  const rows = 3;
  const cols = 2;
  const cx = width / 2;
  const cy = height / 2;
  const size = width * 0.15;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const h = size / 2;
      // the grid points go from -(size/2) ... (size/2)
      const x = map(col, 0, cols - 1, -h, h);
      const y = map(row, 0, rows - 1, -h, h);
      points.push({ x, y });
    }
  }

  // setup our font
  textFont(font);
  textSize(12);

  // draw the hours, minutes, and seconds
  const times = [H, M, S];
  times.forEach((num, i) => {
    // find a midpoint of the 3
    const mid = i - (times.length - 1) / 2;
    // offset the X position so they are adjacent
    const px = mid * size * 2;

    // translate the graphics to center and x-offset
    push();
    translate(width / 2 + px, height / 2);

    // draw binary line graphics
    noFill();
    stroke("white");

    // get the 'bits' array for the number
    const bits = getBits(num);

    // draw lines connecting the 'on' bits
    drawLines(bits, points);

    // draw each point as a circle
    points.forEach((point, index) => {
      // set style, filled if bit is enabled
      if (bits[index] === 1) {
        noStroke();
        fill("white");
      } else {
        stroke("white");
        noFill();
      }
      // draw the circle
      circle(point.x, point.y, size * 0.05);
    });

    // set text style
    noStroke();
    fill("white");

    // draw text above
    textAlign(CENTER, BOTTOM);
    text(num < 10 ? "0" + num : num, 0, -size);

    // draw text below
    textAlign(CENTER, TOP);
    text(bits.join(""), 0, size);

    // reset translation
    pop();
  });
}

function drawLines(bits, points) {
  // draw binary shape by walking through each point
  // and if the bit is enabled, connect it
  strokeJoin(ROUND);
  beginShape();
  bits.forEach((bit, index) => {
    if (bit === 1) {
      const { x, y } = points[index];
      vertex(x, y);
    }
  });
  endShape();
}

function getBits(num) {
  // get decimal as binary array of 5 bits with leading zeros
  let binary = num.toString(2);
  while (binary.length < 5) binary = "0" + binary;
  return binary.split("").map(p => parseInt(p, 10));
}
