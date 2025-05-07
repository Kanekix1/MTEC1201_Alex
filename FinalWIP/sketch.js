//Alex wu 4/27
//This is a add on from midterm v2 with astriods moving and lazers

let rocket;
let lasers = [];
let stars = [];
let asteroids = [];
let gameStarted = false;
let startButton;
let asteroidTimer = 0;

function setup() {
  createCanvas(800, 800);
  rocket = new Rocket();

  //generate stars
  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }

  //start button gui
  startButton = createButton('Start Game');
  startButton.position(width / 2 - 50, height / 2 - 20);
  startButton.size(100, 40);
  startButton.mousePressed(() => {
    gameStarted = true;
    startButton.hide();
    asteroidTimer = millis();
  });
}

function draw() {
  background(0);

  //draw the stars and make it go up
  fill(255);
  noStroke();
  for (let star of stars) {
    if (gameStarted) {
      star.y += 1;
      if (star.y > height) star.y = 0;
    }
    circle(star.x, star.y, star.size);
  }

  if (!gameStarted) {
    drawStartMenu();
  } else {
    rocket.update();
    rocket.show();

    //asteroids spawn every 3 seconds
    if (millis() - asteroidTimer > 3000) {
      asteroids.push(new Asteroid());
      asteroidTimer = millis();
    }

    //shows asteroids
    for (let i = asteroids.length - 1; i >= 0; i--) {
      let a = asteroids[i];
      a.update();
      a.show();

      if (a.y > height) {
        asteroids.splice(i, 1);
      }
    }

    //shows lazer
    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].update();
      lasers[i].show();

      if (lasers[i].offScreen()) {
        lasers.splice(i, 1);
      }
    }
  }
}

//the menu screen when you start the code
function drawStartMenu() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("SPACE GAME", width / 2, height / 2 - 100);

  textAlign(LEFT, BOTTOM);
  textSize(16);
  text("Controls:\nW/A/S/D - Move\nF - Fire Laser", 20, height - 20);
}

//functions to move the rocketship
function keyPressed() {
  if (!gameStarted) return;

  if (key === 'w' || key === 'W') rocket.move(0, -1);
  if (key === 's' || key === 'S') rocket.move(0, 1);
  if (key === 'a' || key === 'A') rocket.move(-1, 0);
  if (key === 'd' || key === 'D') rocket.move(1, 0);
  if (key === 'f' || key === 'F') lasers.push(new Laser(rocket.x, rocket.y));
}

function keyReleased() {
  if (!gameStarted) return;

  if (['w', 's', 'a', 'd', 'W', 'S', 'A', 'D'].includes(key)) {
    rocket.stop();
  }
}

//rocketship
class Rocket {
  constructor() {
    this.x = width / 2;
    this.y = height - 60;
    this.xdir = 0;
    this.ydir = 0;
    this.speed = 5;
  }

  move(x, y) {
    this.xdir = x;
    this.ydir = y;
  }

  stop() {
    this.xdir = 0;
    this.ydir = 0;
  }

  update() {
    this.x += this.xdir * this.speed;
    this.y += this.ydir * this.speed;
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  show() {
    fill(0, 255, 0);
    noStroke();
    rectMode(CENTER);
    rect(this.x, this.y, 20, 40);
  }
}

//lazer effect
class Laser {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speed = 10;
  }

  update() {
    this.y -= this.speed;
  }

  offScreen() {
    return this.y < 0;
  }

  show() {
    fill(255, 0, 0);
    rectMode(CENTER);
    rect(this.x, this.y, 4, 12);
  }
}

//asteroids
class Asteroid {
  constructor() {
    this.x = random(20, width - 20);
    this.y = -20;
    this.size = random(20, 50);
    this.speed = random(1, 3);
  }

  update() {
    this.y += this.speed;
  }

  show() {
    fill(120);
    noStroke();
    ellipse(this.x, this.y, this.size);
  }

  hits(laser) {
    let d = dist(this.x, this.y, laser.x, laser.y);
    return d < this.size / 2;
  }
}