/* eslint-disable */
function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // low frame per second instead of 60 FPS
  frameRate(5);

  // get the current time
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

  // max size of clock face
  const diameter = min(width, height) * 0.75;
  const radius = diameter / 2;

  // scale circle by seconds
  const d = map(S, 0, 59, 0, diameter);
  circle(x, y, d);

  // rotate line by hour
  // (horizontal is noon)
  const py = map(H, 0, 24, -radius, radius);
  line(x - radius, y - py, x + radius, y + py);

  // add 'ticks' for each minute
  for (let i = 0; i < M; i++) {
    const px = x + map(i, 0, M - 1, -radius, radius);
    const len = radius * 0.05;
    line(px, y - len, px, y + len);
  }
}
