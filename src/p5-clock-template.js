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

  // draw something with the current time
  const r = map(S, 0, 59, 0, width);
  circle(r, height / 2, 50);
}
