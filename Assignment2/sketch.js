function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(135, 206, 250); //Blue sky

  //Grass
  drawGrass();

  //Castle
  drawCastle(200, 150);
}

//Drawing half the canvas as grass
function drawGrass() {
  fill(34, 139, 34); //Green
  noStroke();
  rect(0, height / 2, width, height / 2); 
}

//Drawing the castle
function drawCastle(x, y) {
  //The castles main building
  fill(169, 169, 169); //Gray color
  rect(x - 75, y, 150, 100);

  //The towers beside the castle
  fill(169, 169, 169); //Gray color
  rect(x - 115, y + 100 - 105, 40, 105);
  rect(x + 75, y + 100 - 105, 40, 105);

  //Triangle roofs on the towers
  fill(139, 69, 19); //Color brown
  triangle(x - 115, y + 100 - 105, x - 115 + 20, y + 100 - 105 - 50, x - 115 + 40, y + 100 - 105); // Left tower roof
  triangle(x + 75, y + 100 - 105, x + 75 + 20, y + 100 - 105 - 50, x + 75 + 40, y + 100 - 105); // Right tower roof

  //The door on the castle
  fill(139, 69, 19); //Color brown
  rect(x - 20, y + 50, 40, 50); //Position of the door

  //Windows on the castle
  fill(0); //Color black
  rect(x - 55, y + 25, 20, 20); //Left window
  rect(x + 35, y + 25, 20, 20); //Right window
}
  