/* eslint-disable */

let lines;
let colors;

function preload() {
  // Load a book
  // (it's really just a .txt file with a different extension,
  // as it uploads more cleanly in CodeSandbox)
  lines = loadStrings("assets/AdventuresOfSherlockHolmes.book");

  // Load a small set of color names->hex codes
  colors = loadJSON("assets/one-word-colors.json");
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

  // squeeze everything toward the center
  const margin = min(width, height) * 0.2;

  // turn the lines into one big string
  const str = lines.join("\n");
  // get all tokens within that string
  const tokens = splitTokens(str);

  // use this to 'fix' the randomness so that
  // it won't change per frame
  randomSeed("1235");

  // walk through each token
  for (let i = 0; i < tokens.length; i++) {
    // the actual token in the text
    const token = tokens[i];
    // the lower case 'color key' in our JSON
    const key = token.toLowerCase();
    if (key in colors) {
      // the token is a color!
      const hex = colors[key];

      // position X by hue
      let x = map(hue(hex), 0, 360, margin, width - margin);

      // position Y by saturation() or lightness()
      let y = map(saturation(hex), 100, 0, margin, height - margin);

      // jitter randomly so they don't overlap
      const jitter = 25;
      x += randomGaussian() * jitter;
      y += randomGaussian() * jitter;

      // draw the last, current, and next token
      const msg = tokens.slice(i - 1, i + 2).join(" ");

      // setup font
      textAlign(LEFT, CENTER);
      textSize(6);
      textFont("monospace");

      // fill text with our color
      noStroke();
      fill(hex);
      text(msg, x, y);

      // draw underline
      noFill();
      stroke(hex);
      strokeWeight(1);
      line(x, y + 4, x + textWidth(msg), y + 4);
    }
  }
}
