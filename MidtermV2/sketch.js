let showMessage = true;
let stars = [];
let planets = [];

function setup() {
  createCanvas(1000, 1000);

  //generate stars
  for (let i = 0; i < 50; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(2, 5)
    });
  }

  //generates planets on both side of the screen
  for (let i = 0; i < 8; i++) {
    let side = random() < 0.5 ? 'left' : 'right';
    let x = side === 'left' ? random(50, 300) : random(700, 950);
    let y = random(height);
    let size = random(40, 80);
    let hasRing = random() < 0.5;
    let color = colorFromHue(random(360));
    planets.push({ x, y, size, hasRing, color });
  }
}

function draw() {
  background(0);

  drawStars();
  drawPlanets();

  //rocket is positioned in the middle of the screen
  textSize(64);
  textAlign(CENTER, CENTER);
  text('🚀', width / 2, height / 2);

  if (showMessage) {
    fill(255, random(180, 255));
    textSize(32);
    text("Tap E to start your rocket", width / 2, height / 4);
  }
}

//this makes it so the stars move instead of the rocket
function drawStars() {
  fill(255);
  noStroke();
  for (let star of stars) {
    ellipse(star.x, star.y, star.size);
    if (!showMessage) {
      star.y += 1.5;
      if (star.y > height) {
        star.y = 0;
        star.x = random(width);
      }
    }
  }
}

//randomly generates the planets and if they have a ring around them or not
function drawPlanets() {
  for (let p of planets) {
    push();
    noStroke();
    fill(p.color);
    ellipse(p.x, p.y, p.size);
    
    if (p.hasRing) {
      noFill();
      stroke(200, 200, 255, 120);
      strokeWeight(2);
      ellipse(p.x, p.y, p.size + 15, p.size * 0.6);
    }
    pop();

    if (!showMessage) {
      p.y += 1.5;
      if (p.y > height + p.size) {
        p.y = -p.size;
        p.x = p.x < width / 2 ? random(50, 300) : random(700, 950);
        p.size = random(40, 80);
        p.hasRing = random() < 0.5;
        p.color = colorFromHue(random(360));
      }
    }
  }
}

//starts the game
function keyPressed() {
  if (key === 'e' || key === 'E') {
    showMessage = false;
  }

  //resets the game
  if (key === 'r' || key === 'R') {
    showMessage = true;
    resetStarsAndPlanets();
  }
}

function resetStarsAndPlanets() {
  for (let star of stars) {
    star.x = random(width);
    star.y = random(height);
  }

  for (let p of planets) {
    p.y = random(height);
    p.x = p.x < width / 2 ? random(50, 300) : random(700, 950);
  }
}

//generates the color of the planets
function colorFromHue(hue) {
  colorMode(HSB);
  let c = color(hue, 80, 100);
  colorMode(RGB);
  return c;
}