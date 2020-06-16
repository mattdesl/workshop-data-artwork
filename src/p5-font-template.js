/* eslint-disable */

let font;

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
  // disable animation loop (optional)
  noLoop();

  // fill background
  background("black");

  // draw your scene
  fill("white");
  noStroke();
  textFont(font);
  textSize(32);
  textAlign(CENTER, CENTER);
  text("Source Code Pro", width / 2, height / 2);
}
