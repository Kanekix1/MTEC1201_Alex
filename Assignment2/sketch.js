function setup() {
  createCanvas(400, 400);
  noLoop(); // Prevent continuous redrawing
}

function draw() {
  background(135, 206, 250); // Sky blue

  // Draw the grass covering half the canvas (from y = 200 to the bottom)
  drawGrass();

  // Draw the castle on the grass
  drawCastle(200, 150);
}

// Function to draw the grass
function drawGrass() {
  fill(34, 139, 34); // Grass green
  noStroke();
  rect(0, height / 2, width, height / 2); // Grass at the bottom half of the canvas
}

// Function to draw the castle
function drawCastle(x, y) {
  // Castle body (main structure) positioned above the grass
  fill(169, 169, 169); // Gray for the castle walls
  rect(x - 75, y, 150, 100); // Main rectangular part of the castle (above the grass)

  // Castle towers (with triangular roofs) positioned next to the main body and increased height
  fill(169, 169, 169); // Gray for the towers
  rect(x - 115, y + 100 - 105, 40, 105); // Left tower with bottom aligned with the bottom of the main body
  rect(x + 75, y + 100 - 105, 40, 105); // Right tower with bottom aligned with the bottom of the main body

  // Triangular roofs for the towers (centered on the towers)
  fill(139, 69, 19); // Brown for the roofs
  triangle(x - 115, y + 100 - 105, x - 115 + 20, y + 100 - 105 - 50, x - 115 + 40, y + 100 - 105); // Left tower roof
  triangle(x + 75, y + 100 - 105, x + 75 + 20, y + 100 - 105 - 50, x + 75 + 40, y + 100 - 105); // Right tower roof

  // Draw the castle door (on the main body)
  fill(139, 69, 19); // Brown for the door
  rect(x - 20, y + 50, 40, 50); // Door in the middle of the castle

  // Draw windows on the castle (black windows)
  fill(0); // Black for windows
  rect(x - 55, y + 25, 20, 20); // Left window
  rect(x + 35, y + 25, 20, 20); // Right window
}
