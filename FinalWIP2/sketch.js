let rocket;
let lasers = [];
let stars = [];
let asteroids = [];
let gameStarted = false;
let startButton;
let asteroidTimer = 0;
let lives = 3;
let score = 0;
let gameOver = false;

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

  //starting screen
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

  //animation of stars
  fill(255);
  noStroke();
  for (let star of stars) {
    if (gameStarted && !gameOver) {
      star.y += 1;
      if (star.y > height) star.y = 0;
    }
    circle(star.x, star.y, star.size);
  }

  if (!gameStarted) {
    drawStartMenu();
  } else if (gameOver) {
    drawGameOver();
  } else {
    rocket.update();
    rocket.show();

    //astriod spawns every 3 seconds
    if (millis() - asteroidTimer > 3000) {
      asteroids.push(new Asteroid());
      asteroidTimer = millis();
    }

    //generates the astroid on the screen
    for (let i = asteroids.length - 1; i >= 0; i--) {
      let a = asteroids[i];
      a.update();
      a.show();

      //verifies the lazer hitting the astroid
      for (let j = lasers.length - 1; j >= 0; j--) {
        if (a.hits(lasers[j])) {
          asteroids.splice(i, 1);
          lasers.splice(j, 1);
          score += 100;
          break;
        }
      }

      //collision with rocket
      if (a.hitsRocket(rocket)) {
        asteroids.splice(i, 1);
        lives--;
        if (lives <= 0) gameOver = true;
      }

      if (a.y > height) {
        asteroids.splice(i, 1);
      }
    }

    //spawns lazer from rocket ship
    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].update();
      lasers[i].show();

      if (lasers[i].offScreen()) {
        lasers.splice(i, 1);
      }
    }

    //gui for the score and lives the player have
    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text(Score: ${score}, 10, 10);
    text(Lives: ${lives}, 10, 35);
  }
}

function drawStartMenu() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("SPACE GAME", width / 2, height / 2 - 100);

  textAlign(LEFT, BOTTOM);
  textSize(16);
  text("Controls:\nW/A/S/D - Move\nF - Fire Laser", 20, height - 20);
}

function drawGameOver() {
  fill(255, 50, 50);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(24);
  text(Final Score: ${score}, width / 2, height / 2 + 10);
  textSize(16);
  text("Press 'R' to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (gameOver) {
    if (key === 'r' || key === 'R') {
      //keybind to reset when game over
      gameOver = false;
      lives = 3;
      score = 0;
      asteroids = [];
      lasers = [];
      rocket = new Rocket();
      asteroidTimer = millis();
    }
    return;
  }

  if (!gameStarted) return;

  if (key === 'w' || key === 'W') rocket.move(0, -1);
  if (key === 's' || key === 'S') rocket.move(0, 1);
  if (key === 'a' || key === 'A') rocket.move(-1, 0);
  if (key === 'd' || key === 'D') rocket.move(1, 0);
  if (key === 'f' || key === 'F') lasers.push(new Laser(rocket.x, rocket.y));
}

function keyReleased() {
  if (!gameStarted || gameOver) return;

  if (['w', 's', 'a', 'd', 'W', 'S', 'A', 'D'].includes(key)) {
    rocket.stop();
  }
}

//the rocket ship
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

//the lazer effect
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

//the asteroid object
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

  hitsRocket(rocket) {
    let d = dist(this.x, this.y, rocket.x, rocket.y);
    return d < this.size / 2 + 20;
  }
}