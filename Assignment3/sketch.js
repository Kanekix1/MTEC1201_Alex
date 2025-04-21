function setup() {
  createCanvas(800, 600);
}

function draw() {
  background(135, 206, 235); //Sky
  drawSun();
  drawCloud(150, 100);
  drawCloud(500, 70);
  drawGround();

  for (let i = 0; i < 20; i++) {
    let x = random(width);
    let y = random(height - 170, height - 100);
    drawTree(x, y);
  }
}

function drawGround() {
  noStroke();
  fill(85, 107, 47); //Ground
  rect(0, height - 120, width, 120);
}

function drawTree(x, y) {
  //Trunk
  fill(101, 67, 33);
  rect(x - 10, y, 20, 60);

  //Tree leafs
  fill(34, 139, 34);
  triangle(x - 40, y, x, y - 60, x + 40, y);
  triangle(x - 35, y - 30, x, y - 80, x + 35, y - 30);
  triangle(x - 30, y - 55, x, y - 100, x + 30, y - 55);
}

function drawSun() {
  fill(255, 204, 0);
  noStroke();
  ellipse(700, 100, 100, 100);
}

function drawCloud(x, y) {
  fill(255);
  noStroke();
  ellipse(x, y, 60, 60);
  ellipse(x + 30, y + 10, 60, 60);
  ellipse(x - 30, y + 10, 60, 60);
  ellipse(x, y + 20, 60, 60);
}