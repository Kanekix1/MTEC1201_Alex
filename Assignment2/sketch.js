function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 250); //Color blue

  //Grass
  drawGrass();

  //Castle
  drawCastle(200, 150);
}

//Drawing half the canvas grass
function drawGrass() {
  fill(34, 139, 34); //Color green
  noStroke();
  rect(0, height / 2, width, height / 2);
}

//Drawing the castle
function drawCastle(x, y) {
  //The castles main building
  fill(169, 169, 169); //Color gray
  rect(x - 75, y, 150, 100);

  //The towers of the castle
  fill(169, 169, 169); //Color gray
  rect(x - 115, y + 100 - 105, 40, 105);
  rect(x + 75, y + 100 - 105, 40, 105);
  
  //Triangle roof for the towers
  fill(139, 69, 19); //Color brown
  triangle(x - 115, y + 100 - 105, x - 115 + 20, y + 100 - 105 - 50, x - 115 + 40, y + 100 - 105); //Left
  triangle(x + 75, y + 100 - 105, x + 75 + 20, y + 100 - 105 - 50, x + 75 + 40, y + 100 - 105); //Right

  //The door for the castle
  fill(139, 69, 19); //Color brown
  rect(x - 20, y + 50, 40, 50); //Door position

  //Windows for the castle
  fill(0); //Color black
  rect(x - 55, y + 25, 20, 20); //Left
  rect(x + 35, y + 25, 20, 20); //Right
}
