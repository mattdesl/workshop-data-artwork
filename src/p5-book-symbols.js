/* eslint-disable */

let lines;

function preload() {
  // Load a book
  // (it's really just a .txt file with a different extension,
  // as it uploads more cleanly in CodeSandbox)
  lines = loadStrings("assets/AliceInWonderland.book");
}

function setup() {
  createCanvas(290, 1000);
  pixelDensity(2);
}

// Disable this function for this sketch
// function windowResized() {
//   resizeCanvas(windowWidth, windowHeight);
// }

function draw() {
  // disable animation loop (static artwork, no animation)
  noLoop();

  // fill background with off-white
  background(240);

  // don't render every line, just a subset
  lines = lines.slice(0, 100);

  // setup sizes
  const charWidth = 4;
  const charHeight = 10;
  const fontSize = 10;

  // setup font
  textFont("monospace");
  textSize(fontSize);

  // using stroke with filled text is a easy way to thicken it
  stroke("black");
  fill("black");

  // for each line in text
  for (let i = 0; i < lines.length; i++) {
    // get line as text string
    const curLine = lines[i];
    // for each char in text line
    for (let j = 0; j < curLine.length; j++) {
      // get char
      const chr = curLine.charAt(j);
      // find position in pixels
      const x = j * charWidth;
      const y = i * charHeight;
      // see which symbol to draw
      if ("aeiouy".includes(chr)) {
        text("○", x, y);
      } else if ("-–—!@#$%^&*(){}\".,/?:;'".includes(chr)) {
        text("｜", x, y);
      }
    }
  }
}
