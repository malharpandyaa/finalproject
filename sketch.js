let colors = ['red', 'orange', 'yellow', 'green', 'cyan', 'blue', 'magenta', 'brown', 'white', 'black'];
let selectedColor = 'black';
let bgMusic;
let brushSound;
let clearScreenSound;
let saveFileSound;
let colorSelect;
let lastPaintTime = 0;
let musicSpeedIncreaseRate = 0.05;

function preload() {
  bgMusic = loadSound('assets/background.mp3'); 
  bgMusic.setVolume(1);

  brushSound = loadSound('assets/paintbrush.mp3'); 
  brushSound.setVolume(0.5);

  clearScreenSound = loadSound('assets/clear.mp3'); 

  saveFileSound = loadSound('assets/save.mp3'); 

  colorSelect = loadSound('assets/click.mp3');
  colorSelect.setVolume(0.5);

}

function setup() {
  createCanvas(700, 500);
  background(240);
  bgMusic.loop(); 
}

function draw() {
  drawPalette();
  drawInstructions();
  strokeWeight(1);
  if (mouseIsPressed) {
    if (mouseIsPressed) {
      if (millis() - lastPaintTime > 200) { // Increase speed if 200 milliseconds have passed since last paint
        bgMusic.rate(bgMusic.rate() + musicSpeedIncreaseRate); // Increase background music speed
        lastPaintTime = millis();
      }
    }
    if (mouseX > 25) {
      stroke(selectedColor);
      strokeWeight(10);
      line(mouseX, mouseY, pmouseX, pmouseY);
      strokeWeight(1);
      brushSound.play(); 
    } else {
      for (let i = 0; i < colors.length; i++) {
        if (mouseY > i * 25 && mouseY < (i + 1) * 25) {
          selectedColor = colors[i];
          colorSelect.play();
          break;
        }
      }
    }
  }
}

function drawPalette() {
  stroke('white');
  for (let i = 0; i < colors.length; i++) {
    fill(colors[i]);
    rect(0, i * 25, 25, 25);
  }
}

function drawInstructions() {
  fill(0); 
  textSize(12); 
  textAlign(LEFT, BOTTOM); 
  text('Press "C" to clear canvas', 10, height - 10);

  fill(0); 
  textSize(12); 
  textAlign(RIGHT, BOTTOM); 
  text('Press "S" to save to computer', 690, height - 10);
}



function keyPressed() {
  if (key === 'c') {
    clearScreen();
  } else if (key === 's') {
    saveCanvas('myCanvas', 'png');
    saveFileSound.play(); 
  }
}

function mouseReleased() {
  saveFile();
}

function clearScreen() {
  background(240);
  clearScreenSound.play(); 
}






