/* eslint-disable */

let font;

function preload() {
  // load a custom braille font
  font = loadFont("assets/AppleBraille.ttf");
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

  // get the current time
  const H = hour();
  const M = minute();
  const S = second();

  // setup colors and styles
  background("black");

  // indicates a number in braille
  const numberPrefix = "⠼";

  // translate digits to braille
  const hb = numberToBraille(H);
  const mb = numberToBraille(M);
  const sb = numberToBraille(S);

  // draw braille text
  fill("white");
  noStroke();
  textSize(50);
  textFont(font);
  textAlign(CENTER, CENTER);
  text(numberPrefix + hb + " " + mb + " " + sb, width / 2, height / 2);
}

function numberToBraille(num) {
  // text containing 0 .. 9 as braille, in order
  // copied from:
  // https://www.pharmabraille.com/pharmaceutical-braille/the-braille-alphabet/
  const digits09 = "⠚⠁⠃⠉⠙⠑⠋⠛⠓⠊";

  // turn the decimal value into a string
  let str = String(num);
  // if less than 10, include a 0 before
  // i.e. 07
  if (str.length < 2) str = "0" + str;

  // now go through all the digits in the string...
  let result = "";
  for (let i = 0; i < str.length; i++) {
    // parse the digit character as a decimal integer
    const digit = parseInt(str.charAt(i), 10);
    // use the digits09 as a "lookup" to find the translation
    const braille = digits09.charAt(digit);
    // append that to our final string
    result += braille;
  }
  return result;
}
