let showMessage = true;
let rocketY; // where the rocket will be

function setup() {
  createCanvas(1000, 1000);
  rocketY = height - 50;
}

function draw() {
  background(0);

  // these are stars
  ellipse(800, 200, 4);
  ellipse(850, 100, 4);
  ellipse(975, 300, 4);
  ellipse(980, 350, 4);
  ellipse(50, 50, 4);
  ellipse(25, 100, 4);
  ellipse(25, 500, 4);
  ellipse(100, 500, 4);
  ellipse(200, 400, 4);
  ellipse(300, 300, 4);
  ellipse(250, 600, 4);
  ellipse(500, 700, 4);
  ellipse(500, 500, 4);
  ellipse(400, 900, 4);
  ellipse(100, 980, 4);
  ellipse(50, 800, 4);
  ellipse(150, 750, 4);
  ellipse(300, 600, 4);
  ellipse(350, 700, 4);
  ellipse(400, 800, 4);
  ellipse(450, 900, 4);
  ellipse(700, 900, 4);
  ellipse(600, 980, 4);
  ellipse(800, 700, 4);
  ellipse(750, 888, 4);
  ellipse(674, 947, 4);
  ellipse(567, 804, 4);
  ellipse(602, 925, 4);
  ellipse(650, 600, 4);
  ellipse(775, 816, 4);
  ellipse(817, 617, 4);
  ellipse(500, 100, 4);
  ellipse(400, 250, 4);
  ellipse(300, 200, 4);
  ellipse(600, 100, 4);
  ellipse(550, 50, 4);
  ellipse(500, 350, 4);
  ellipse(450, 275, 4);
  ellipse(425, 400, 4);
  ellipse(700, 200, 4);
  ellipse(550, 425, 4);
  ellipse(480, 280, 4);
  ellipse(560, 380, 4);

  // the rocket emoji
  textSize(64);
  textAlign(CENTER, CENTER);
  text('🚀', width / 2, rocketY); 

  // if the "e" key has been pressed move the rocket upwards
  if (!showMessage) {
    rocketY -= 2; 
  }

  // display message before the "e" key is pressed
  if (showMessage) {
    fill(255);
    textSize(32);
    textAlign(CENTER, CENTER);
    text("Tap E to start your rocket", width / 2, height / 4);
  }
}


function keyPressed() {
  // start the rocket when "e" is pressed
  if (key === 'e' || key === 'E') {
    if (showMessage) {
      showMessage = false; 
    }
  }

  // resets the rocket when "r" is pressed
  if (key === 'r' || key === 'R') {
    rocketY = height - 50; 
    showMessage = true; 
  }
}