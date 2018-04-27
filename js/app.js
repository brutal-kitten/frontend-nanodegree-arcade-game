const X_STEP = 101;
const Y_STEP = 83;
const LEFT_BORDER = 0;
const RIGHT_BORDER = 420;
const TOP_BORDER = 40;
const BOTTOM_BORDER = 299;
const ENEMY_STEP = 101;
const startBoy = document.querySelector('.startBoy');
const startGirl = document.querySelector('.startGirl');
const modal = document.getElementById('startModal');
const lastModal = document.getElementById('lastModal');
const modalMessage = document.getElementById('modal-message');
const numberOfLives = document.querySelector('.lives');
const coins = document.querySelector('.score');
const reStart = document.getElementById('reStart');
let boy = 'images/char-boy.png';
let girl = 'images/char-pink-girl.png';
let bug = 'images/enemy-bug.png';


// Superclass that represents every game object
class GameObject {
    constructor (x, y, sprite, speed) {
        this.x = x;
        this.y = y;
        this.speed = speed;
        this.sprite = sprite;
    };

    //draw the object
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    };

    //check the collision with Player, returns boolean
    isCollision() {
        if (Math.abs(this.x - player.x) < 50 && Math.abs(this.y - player.y) < 10 ){
            console.log("collision");
            return true;
        } else {
            return false;
        };
    };
};

// game object - Enemy, inherit from the GameObject
class Enemy extends GameObject {
    constructor(x, y, sprite, speed) {
        super(x, y, sprite, speed);
  };

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
    // dt parameter will ensure the game runs at the same speed for
    // all computers.
        this.x = this.x + (dt * this.speed * ENEMY_STEP);
        if(this.x > 450) {
            this.x = 0;
            (this.speed < 3) ? (this.speed +=1) : (this.speed = 1)
        };
    };

};

// game object - Player, the hero oh the game, inherit from the GameObject
class Player extends GameObject {
    constructor(x, y, sprite, speed = 1, numberOflives = 3, score = 0){
        super(x, y, sprite, speed);
        this.numberOflives = numberOflives;
        this.score = score;
  };

    moveLeft() {
        this.x -= X_STEP;
        if (this.x < LEFT_BORDER) {
            this.x = LEFT_BORDER;
        };
    };

    moveRight() {
        this.x += X_STEP;
        if (this.x > RIGHT_BORDER) {
            this.x = RIGHT_BORDER;
        };
    };

    moveUp() {
        this.y -= Y_STEP;
        if (this.y < TOP_BORDER) {
            this.increaseScore();
            console.log("you win in this round");
            this.y = 299;
        };
    };

    moveDown() {
        this.y += Y_STEP;
        if (this.y > BOTTOM_BORDER) {
            this.y = BOTTOM_BORDER;
        };
    };

    //reset player's position to the start position
    reset() {
        this.x = 200;
        this.y = 299;
        console.log("reset")
    };

    // set player's numberOfLives and score to the initial value
    reLoad() {
        this.numberOflives = 3;
        this.score = 0;
    };

    //check the player's number of lives
    isDead() {
        return (this.numberOflives < 1);
    };

    // decrease player's numberOfLives by one,
    // update the number of lives on score panel
    // check whether the player is alive, if not - invoke the gameOver function
    decreaseNumberOFLives() {
        this.numberOflives -= 1;
        var number = this.numberOflives;
        game.udateNumbersOfLives(number);
        console.log(`number of lives is: ${this.numberOflives}`);
        if (this.isDead()) {
            game.gameOver();
        };
    };

    // increase player's score by 50
    // update the score on score panel
    // invoke finction that check the score to know if the player won
    increaseScore () {
        this.score += 50;
        var newScore = this.score;
        console.log(`new score is `,  newScore);
        game.updateScore(newScore);
        game.checkScore(newScore);
    };

    //set the  player's sprite
    setTheHero(hero) {
        this.sprite = hero;
    };

    //update with speed
    update() {
        this.x = this.x * this.speed;
        this.x = this.x * this.speed;
      };

    //handle the respond to the key
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

//check collision for every enemy in  array
function checkCollisions() {
    allEnemies.forEach(function(enemy) {
        if(enemy.isCollision()){
              //if collision happens decrease number of player's lives by one
              console.log("here we are");
              player.decreaseNumberOFLives();
              //reset player to the initial position
              player.reset();
        };
    });
};



class Game {

    gameOver() {
        this.endOfTheGame ("Game over");
    };

    youWon() {
        this.endOfTheGame ("You won!");
    };

    //show modal window with final message
    endOfTheGame(message) {
        modalMessage.textContent = message;
        lastModal.style.display = "block";
    };

    // update number of lives on the score panel
    udateNumbersOfLives(number) {
        numberOfLives.textContent = number;
    };

    //update score on the score panel
    updateScore(score) {
        console.log(`in the score updator`, score);
        coins.textContent = score;
    };

    //check whether the player has alredy won
    checkScore (score) {
        if (score > 149) {
            this.youWon();
        };
    };

    //update score panel
    startTheGame() {
        this.udateNumbersOfLives(3);
        this.updateScore(0);
    };
};


  // Now instantiate your objects.
  // Place all enemy objects in an array called allEnemies
  // Place the player object in a variable called player
let game = new Game ();
let enemy1 = new Enemy(0, 133, bug, 1);
let enemy2 = new Enemy(0, 50, bug, 2);
let enemy3 = new Enemy(0, 216, bug, 3);
let allEnemies = [enemy1, enemy2, enemy3];
let player = new Player(200, 299, boy);


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
    game.startTheGame();
    modal.style.display = "none";
});

startGirl.addEventListener("click", function(evt) {
    player.setTheHero(girl);
    game.startTheGame();
    modal.style.display = "none";
});

reStart.addEventListener("click", function(evt) {
    lastModal.style.display = "none";
    player.reLoad();
    modal.style.display = "block";
});
