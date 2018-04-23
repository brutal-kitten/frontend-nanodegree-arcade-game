const X_STEP = 100;
const Y_STEP = 90;
const LEFT_BORDER = 0;
const RIGHT_BORDER = 450;
const TOP_BORDER = -50;
const BOTTOM_BORDER = 490;


// Enemies our player must avoid
var Enemy = function(x, y) {
  this.x = x;
  this.y = y;
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
  constructor(name, x, y){
    this.name;
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
  }

  moveLeft () {
    this.x -= X_STEP;
    if (this.x < LEFT_BORDER) {
      this.x = 400;
    };
  };

  moveRight () {
    this.x += X_STEP;
    if (this.x > RIGHT_BORDER) {
      this.x = 0;
    };
  };

  moveUp () {
    this.y -= Y_STEP;
    if (this.y < TOP_BORDER) {
      this.y = 410;
    };
  };

  moveDown () {
    this.y += Y_STEP;
    if (this.y > BOTTOM_BORDER) {
      this.y = -40;
    };
  };

  update(dt) {

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
}


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 200);
var enemy2 = new Enemy(0, 100);
var allEnemies = [enemy1, enemy2];
var player = new Player("boy", 200, 410);

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
