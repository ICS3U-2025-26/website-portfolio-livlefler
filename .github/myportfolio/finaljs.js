let player;
let enemies = [];

let score = 0;
let highScore = 0;

let gameState = "title";

let spawnRate = 60;
let frameCounter = 0;

let enemySpeed = 3;

function setup() {
  createCanvas(600, 600);

  player = {
    x: width / 2,
    y: height - 40,
    size: 40,
    speed: 6
  };
}

function draw() {
  background(0);

  if (gameState === "title") {
    drawTitleScreen();
  } else if (gameState === "instructions") {
    drawInstructions();
  } else if (gameState === "play") {
    playGame();
  } else if (gameState === "gameOver") {
    drawGameOver();
  }
}

// TITLE SCREEN
function drawTitleScreen() {
  fill(255);
  textAlign(CENTER);

  textSize(50);
  text("Dodging Dots", width / 2, height / 2 - 50);

  textSize(20);
  text("Use LEFT and RIGHT arrows", width / 2, height / 2);
  text("Avoid the falling dots!", width / 2, height / 2 + 30);
  text("Press ENTER to start", width / 2, height / 2 + 80);

  // HOW TO PLAY BUTTON 
  fill(100);
  rectMode(CENTER);
  rect(width / 2, height / 2 + 140, 200, 50);

  fill(255);
  textSize(18);
  text("How to Play", width / 2, height / 2 + 145);
}

// INSTRUCTIONS SCREEN 
function drawInstructions() {
  fill(255);
  textAlign(CENTER);

  textSize(40);
  text("How to Play", width / 2, 120);

  textSize(20);
  text("Move with LEFT and RIGHT arrows", width / 2, 220);
  text("Avoid the falling red dots", width / 2, 260);
  text("Each dodge = +1 point", width / 2, 300);
  text("Game gets faster over time!", width / 2, 340);

  text("Press B to go back", width / 2, 420);
}

// GAME
function playGame() {

  drawPlayer();
  handleMovement();

  spawnEnemies();
  updateEnemies();

  checkCollisions();

  drawScore();
}

// PLAYER
function drawPlayer() {
  fill(0, 0, 255);
  rectMode(CENTER);
  rect(player.x, player.y, player.size, player.size);
}

function handleMovement() {
  if (keyIsDown(LEFT_ARROW)) {
    player.x -= player.speed;
  }
  if (keyIsDown(RIGHT_ARROW)) {
    player.x += player.speed;
  }

  player.x = constrain(player.x, player.size / 2, width - player.size / 2);
}

// DOTS
function spawnEnemies() {
  frameCounter++;

  if (frameCounter % spawnRate === 0) {
    enemies.push({
      x: random(width),
      y: 0,
      size: 20,
      speed: enemySpeed
    });
  }
}

function updateEnemies() {
  fill(255, 0, 0);

  for (let i = 0; i < enemies.length; i++) {
    let e = enemies[i];
    e.y += e.speed;
    ellipse(e.x, e.y, e.size);

   if (e.y > height) {
  enemies.splice(i, 1);
  score++;

  enemySpeed += 0.2; 
  i--;
   }
  }
}


// COLLISIONS
function checkCollisions() {
  for (let e of enemies) {
    let d = dist(player.x, player.y, e.x, e.y);

    if (d < player.size / 2 + e.size / 2) {
      gameState = "gameOver";

      if (score > highScore) {
        highScore = score;
      }
    }
  }
}

// SCORE
function drawScore() {
  fill(255);
  textSize(20);
  textAlign(LEFT);
  text("Score: " + score, 10, 30);
}

// GAME OVER
function drawGameOver() {
  fill(255);
  textAlign(CENTER);

  textSize(50);
  text("GAME OVER", width / 2, height / 2 - 50);

  textSize(20);
  text("Score: " + score, width / 2, height / 2);
  text("High Score: " + highScore, width / 2, height / 2 + 30);

  text("Press R to Restart", width / 2, height / 2 + 80);
}

// CONTROLS
function keyPressed() {
  if (gameState === "title" && keyCode === 13) {
    gameState = "play";
    resetGame();
  }

  if (gameState === "gameOver" && (key === 'r' || key === 'R')) {
    gameState = "play";
    resetGame();
  }

  // BACK FROM INSTRUCTIONS
  if (gameState === "instructions" && (key === 'b' || key === 'B')) {
    gameState = "title";
  }
}

// MOUSE CLICK
function mousePressed() {
  if (gameState === "title") {
    let bx = width / 2;
    let by = height / 2 + 140;
    let bw = 200;
    let bh = 50;

    if (
      mouseX > bx - bw / 2 &&
      mouseX < bx + bw / 2 &&
      mouseY > by - bh / 2 &&
      mouseY < by + bh / 2
    ) {
      gameState = "instructions";
    }
  }
}

// RESET
function resetGame() {
  score = 0;
  enemies = [];
  player.x = width / 2;

  enemySpeed = 3;    
  spawnRate = 60;    
  frameCounter = 0; }