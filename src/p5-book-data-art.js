/* eslint-disable */

let lines;

function preload() {
  // Load a book
  // (it's really just a .txt file with a different extension,
  // as it uploads more cleanly in CodeSandbox)
  lines = loadStrings("assets/AdventuresOfSherlockHolmes.book");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // disable animation loop (static artwork, no animation)
  noLoop();

  // fill background with off-white
  background(240);

  // instead of the whole book, just take N lines of it
  // i.e. first page or so
  const maxLines = 60;
  lines = lines.slice(0, maxLines);

  // determine the maximum number of characters across all lines
  let maxCharsInLine = 0;
  for (let i = 0; i < lines.length; i++) {
    maxCharsInLine = Math.max(maxCharsInLine, lines[i].length);
  }

  // textSize is ~= lineHeight
  const lineHeight = 7;
  const lineCount = lines.length;

  // setup text properties
  fill("black");
  noStroke();
  textFont("monospace");
  textSize(lineHeight);

  // approximate width of 1 character
  const charWidth = textWidth("W");

  // find out the value we need to offset the text so that it is centered
  const marginX = (width - maxCharsInLine * charWidth) / 2;
  const marginY = (height - lineCount * lineHeight) / 2;

  // we are going to store a list of all the X,Y points to later connect them
  const points = [];

  // start by going through each line
  for (let y = 0; y < lines.length; y++) {
    const line = lines[y];

    // draw the whole line at once at the correct XY position
    text(line, marginX, marginY + lineHeight * y);

    // now walk through each character in that line
    for (let x = 0; x < line.length; x++) {
      const char = line.charAt(x);
      // we can figure out the center pixel X and Y position
      // of the character like so
      const px = marginX + charWidth * x + charWidth / 2;
      const py = marginY + lineHeight * y;
      // if it's the correct character, push it to the list
      if (char === ".") {
        points.push({ x: px, y: py });
      }
    }
  }

  // now we draw the colored lines
  noFill();

  // use low opacity color since we have lots of lines overlapping
  stroke("rgba(255, 0, 0, 0.3)");

  // use a blend mode so that it looks a bit nicer
  blendMode(MULTIPLY);
  // go through each point
  for (let i = 0; i < points.length; i++) {
    // and in turn, go through each other point
    for (let j = 0; j < points.length; j++) {
      // same point, no line needed
      if (i === j) continue;
      // now connect
      const p0 = points[i];
      const p1 = points[j];
      line(p0.x, p0.y, p1.x, p1.y);
    }
  }
  // important! make sure to reset the blend mode to BLEND, i.e. default
  blendMode(BLEND);
}
