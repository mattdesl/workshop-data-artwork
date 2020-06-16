/* eslint-disable */

let lines;

function preload() {
  // Load a book
  // (it's really just a .txt file with a different extension,
  // as it uploads more cleanly in CodeSandbox)
  lines = loadStrings("assets/AliceInWonderland.book");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  // trim to smaller dataset
  lines = lines.slice(0, 15);
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].trim().length !== 0) {
      lines[i] = "↓" + lines[i];
    }
  }
}

// Disable this function for this sketch
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}

function draw() {
  // disable animation loop (static artwork, no animation)
  noLoop();

  // fill background with off-white
  background(240);

  // setup text
  const charHeight = 10;
  textSize(charHeight);
  textFont("monospace");
  textAlign(LEFT, CENTER);

  // compute maximum length of all lines
  const maxLineCount = lines.reduce((m, line) => max(m, line.length), 0);

  // get max and min radius
  const maxRadius = min(width, height) * 0.45;
  const minRadius = min(width, height) * 0.2;

  // how many steps can we take in radians to complete a rotation?
  const angleStep = TWO_PI / maxLineCount;

  // center of screen
  const cx = width / 2;
  const cy = height / 2;

  // walk through each line
  for (let i = 0, c = 0; i < lines.length; i++) {
    // get current line text
    const curLine = lines[i];
    // walk through each character
    for (let j = 0; j < curLine.length; j++) {
      // current character
      const chr = curLine.charAt(j);
      // grow radius as we go through each line
      const radius = map(i, 0, lines.length - 1, minRadius, maxRadius);
      // find out the angle based on character step
      const angle = j * angleStep;
      // push transformation
      push();
      // move to center
      translate(cx, cy);
      // rotate entirely
      rotate(angle);
      // move to radius edge
      translate(radius, 0);

      // optional: unrotate so text is axis aligned
      // rotate(-angle);

      // draw text
      fill("black");
      noStroke();
      text(chr, 0, 0);

      // reset
      pop();
    }
  }
}
