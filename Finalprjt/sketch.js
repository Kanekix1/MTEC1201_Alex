//Alex wu 4/23
//This is a extension of my v2 midterm adding lazers and astroids along with lives and a score board
//My friend helped me with the lazers since it wasnt shooting out and only spawning in on the rocket and the astroid which were frozen at the top of the screen

let rocket;
let lasers = [];
let stars = [];
let asteroids = [];
let explosions = [];
let gameStarted = false;
let startButton;
let asteroidTimer = 0;
let lives = 3;
let score = 0;
let gameOver = false;

function setup() {
  createCanvas(800, 800);
  rocket = new Rocket();

  for (let i = 0; i < 100; i++) {
    stars.push({
      x: random(width),
      y: random(height),
      size: random(1, 3)
    });
  }

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

    //asteroids spawn
    if (millis() - asteroidTimer > 3000) {
      asteroids.push(new Asteroid());
      asteroidTimer = millis();
    }

    for (let i = asteroids.length - 1; i >= 0; i--) {
      let a = asteroids[i];
      a.update();
      a.show();

      for (let j = lasers.length - 1; j >= 0; j--) {
        if (a.hits(lasers[j])) {
          explosions.push(new Explosion(a.x, a.y));
          asteroids.splice(i, 1);
          lasers.splice(j, 1);
          score += 100;
          break;
        }
      }
      
      //takes away one life
      if (a.hitsRocket(rocket)) {
        explosions.push(new Explosion(a.x, a.y));
        asteroids.splice(i, 1);
        lives--;
        if (lives <= 0) gameOver = true;
      }

      if (a.y > height) {
        asteroids.splice(i, 1);
      }
    }

    for (let i = lasers.length - 1; i >= 0; i--) {
      lasers[i].update();
      lasers[i].show();
      if (lasers[i].offScreen()) {
        lasers.splice(i, 1);
      }
    }

    for (let i = explosions.length - 1; i >= 0; i--) {
      explosions[i].update();
      explosions[i].show();
      if (explosions[i].isFinished()) {
        explosions.splice(i, 1);
      }
    }

    fill(255);
    textSize(20);
    textAlign(LEFT, TOP);
    text(`Score: ${score}`, 10, 10);
    text(`Lives: ${lives}`, 10, 35);
  }
}

//menu
function drawStartMenu() {
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(36);
  text("SPACE GAME", width / 2, height / 2 - 100);

  textAlign(LEFT, BOTTOM);
  textSize(16);
  text("Controls:\nW/A/S/D - Move\nF - Fire Laser", 20, height - 20);
}

//menu after the rocket explodes 
function drawGameOver() {
  fill(255, 50, 50);
  textAlign(CENTER, CENTER);
  textSize(48);
  text("GAME OVER", width / 2, height / 2 - 40);
  textSize(24);
  text(`Final Score: ${score}`, width / 2, height / 2 + 10);
  textSize(16);
  text("Press 'R' to Restart", width / 2, height / 2 + 50);
}

function keyPressed() {
  if (gameOver) {
    if (key === 'r' || key === 'R') {
      gameOver = false;
      lives = 3;
      score = 0;
      asteroids = [];
      lasers = [];
      explosions = [];
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
    fill(150); //the space ship model with grey color 
    noStroke();
    push();
    translate(this.x, this.y);
    triangle(0, -20, -10, 20, 10, 20);
    pop();
  }
}

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

class Explosion {
  constructor(x, y) {
    this.particles = [];
    for (let i = 0; i < 20; i++) {
      this.particles.push({
        x: x,
        y: y,
        vx: random(-2, 2),
        vy: random(-2, 2),
        life: 255
      });
    }
  }

  update() {
    for (let p of this.particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.life -= 5;
    }
    this.particles = this.particles.filter(p => p.life > 0);
  }

  show() {
    noStroke();
    for (let p of this.particles) {
      fill(255, 100, 0, p.life); //the explosion effect
      ellipse(p.x, p.y, 5);
    }
  }

  isFinished() {
    return this.particles.length === 0;
  }
}
