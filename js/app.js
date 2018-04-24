const X_STEP = 100;
const Y_STEP = 90;
const LEFT_BORDER = 0;
const RIGHT_BORDER = 420;
const TOP_BORDER = 40;
const BOTTOM_BORDER = 410;
const ENEMY_STEP = 100;
const startBoy = document.querySelector('.startBoy');
const startGirl = document.querySelector('.startGirl');
const modal = document.getElementById('startModal');
const lastModal = document.getElementById('lastModal');
const modalMessage = document.getElementById('modal-message');
const numberOfLives = document.querySelector('.lives');
const coins = document.querySelector('.score');
let boy = 'images/char-boy.png';
let girl = 'images/char-pink-girl.png';



// Enemies our player must avoid
class Enemy {
    constructor(x, y, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
        this.sprite = 'images/enemy-bug.png';
  };


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
    update(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
        this.x = this.x + (dt * this.speed * ENEMY_STEP);
        if(this.x > 450) {
            this.x = 0;
            (this.speed < 3) ? (this.speed +=1) : (this.speed = 1)
        };
    };

    isCollision() {
        if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 20 ){
            console.log("collision");
            return true;
        } else {
              return false;
          };
    };

// Draw the enemy on the screen, required method for game
  render() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };
};


function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if(enemy.isCollision()){
              console.log("here we are");
              player.decreaseNumberOFLives();
              player.reset();

        };
    });
};

function gameOver () {
    endOfTheGame ("Game over");
};

function youWon () {
    endOfTheGame ("You won!");
};

function endOfTheGame (message) {
    modalMessage.textContent = message;
    lastModal.style.display = "block";
};
// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor(x, y, numberOflives=3, speed=1, score=0){
        this.x = x;
        this.y = y;
        this.numberOflives = numberOflives;
        this.speed = speed;
        this.sprite = 'images/char-boy.png';
        this.score = score;
  }

    moveLeft () {
        this.x -= X_STEP;
        if (this.x < LEFT_BORDER) {
            this.x = LEFT_BORDER;
        };
    };

    moveRight () {
        this.x += X_STEP;
        if (this.x > RIGHT_BORDER) {
            this.x = RIGHT_BORDER;
        };
    };

    moveUp () {
        this.y -= Y_STEP;
        if (this.y < TOP_BORDER) {
            player.increaseScore();
            console.log("you win in this round");
            this.y = 410;
        };
    };

    moveDown () {
        this.y += Y_STEP;
        if (this.y > BOTTOM_BORDER) {
            this.y = BOTTOM_BORDER;
        };
    };

    reset () {
        this.x = 200;
        this.y = 410;
        console.log("reset")
    };

    isDead(){
      return(this.numberOflives < 1)
    };

    decreaseNumberOFLives() {
      this.numberOflives -= 1;
      var number = this.numberOflives;
      udateNumbersOfLives(number);
      console.log(`number of lives is: ${this.numberOflives}`);
      if(player.isDead()) {
        gameOver();
      };
    };

    increaseScore () {
      this.score += 50;
      var newScore = this.score;
      console.log(`new score is `,  newScore);
      updateScore(newScore);
      checkScore(newScore);
    };

    setTheHero(hero) {
        this.sprite = hero;
    };

  update() {

  };

  render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput(direction) {
      switch(direction) {
          case "left":
              this.moveLeft();
              break;
          case "right":
              this.moveRight();
              break;
          case "up":
              this.moveUp();
              break;
          case "down":
              this.moveDown();
              break;
      };

  };
};

function udateNumbersOfLives(number) {
    numberOfLives.textContent = number;
};

function updateScore(score) {
    console.log(`in the score updator`, score);
    coins.textContent = score;
};

function checkScore (score) {
    if (score > 149) {
        youWon();
    };
};

function startTheGame() {
    udateNumbersOfLives(3);
    updateScore(0);
};


  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player

let enemy1 = new Enemy(0, 140, 1);
let enemy2 = new Enemy(0, 50, 2);
let enemy3 = new Enemy(0, 230, 3);
let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(200, 410);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});


startBoy.addEventListener("click", function(evt) {
    player.setTheHero(boy);
    startTheGame();
    modal.style.display = "none";
});

startGirl.addEventListener("click", function(evt) {
    player.setTheHero(girl);
    startTheGame();
    modal.style.display = "none";
});
