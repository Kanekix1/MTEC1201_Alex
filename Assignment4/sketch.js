function setup() {
  createCanvas(800, 800);
  noLoop();
}

function draw() {
  background(135, 206, 235); //blue sky background

  drawSun();
  drawClouds();
  drawGrass();
  drawTrees();
  drawCliff();
  drawWaterfall();
  drawBubbles();
}

//the sun
function drawSun() {
  fill(255, 204, 0);
  noStroke();
  ellipse(100, 100, 100);
}

//randomized clouds
function drawClouds() {
  fill(255);
  noStroke();
  for (let i = 0; i < 5; i++) {
    let x = random(100, 700);
    let y = random(50, 200);
    ellipse(x, y, 60, 40);
    ellipse(x + 30, y + 10, 50, 30);
    ellipse(x - 30, y + 10, 50, 30);
  }
}

//grass
function drawGrass() {
  fill(34, 139, 34); //green
  rect(0, 700, width, 100);
}

//trees
function drawTrees() {
  for (let i = 50; i < 600; i += 100) {
    fill(101, 67, 33); //base
    rect(i + 10, 640, 20, 60);
    fill(0, 100, 0); //leaves
    rect(i, 600, 40, 40);
  }
}

//cliff/mountain
function drawCliff() {
  fill(139, 69, 19); //color brown
  rect(650, 300, 150, 400);
}

//waterfall
function drawWaterfall() {
  fill(173, 216, 230);
  rect(690, 300, 40, 400);
}

//bubbles
function drawBubbles() {
  fill(255, 255, 255, 180);
  for (let i = 0; i < 15; i++) {
    let x = random(680, 740);
    let y = random(690, 720);
    let r = random(5, 15);
    ellipse(x, y, r);
  }
}
