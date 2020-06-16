/* eslint-disable */

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // disable animation loop (optional)
  noLoop();

  // fill background
  background("black");

  // draw your scene
  noFill();
  stroke("white");
  circle(width / 2, height / 2, 50);
}
