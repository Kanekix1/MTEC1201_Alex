function setup() {
  createCanvas(400, 400);
}

function draw() {
  //The background of grass and the sky
  noStroke();
  fill(135, 206, 250); //Color of the sky
  rect(0, 0, width, height / 2); //Position of the sky
  fill(34, 139, 34); //Color of the grass
  rect(0, height / 2, width, height / 2); //Position of the grass
  //Trees
  drawPineTree(60, height / 2 - 60);
  drawPineTree(340, height / 2 - 60);

  //The rock
  drawRock(width / 2, height / 2);
}

// Function to draw a pine tree at a given position (x, y)
function drawPineTree(x, y) {
  
  fill(139, 69, 19); //Brown color for the trunk
  rect(x - 10, y, 20, 60); //Size of the trunk
  

  fill(0, 128, 0); //Color of leaves
  
  let triangleHeight = 40; //Height of triangles
  let triangleWidth = 80; //Width of triangles
  
 
  triangle(x - triangleWidth / 2, y, x, y - triangleHeight, x + triangleWidth / 2, y); 
  triangle(x - triangleWidth / 2, y - triangleHeight / 2, x, y - 3 * triangleHeight / 2, x + triangleWidth / 2, y - triangleHeight / 2); 
  triangle(x - triangleWidth / 2, y - triangleHeight, x, y - 2 * triangleHeight, x + triangleWidth / 2, y - triangleHeight); 
}

//Draws a rock at the middle
function drawRock(x, y) {
  fill(169, 169, 169); //Color of the rock
  ellipse(x, y, 80, 50); //I used a ellipse to make the rock
}