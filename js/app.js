// Enemies our player must avoid
var Enemy = function (lanes) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.y = -20 + (lanes * 80);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * 100 + this.speed);
    // If an enemy object moves out of the screen, it resets
    // back to its origin with a new speed value.
    if (this.x > 615) {
        this.visible();
    }
};


Enemy.prototype.visible = function () {
    this.x = -100;
    this.speed = Math.floor((Math.random() * 4));
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;

};

Player.prototype.update = function (dt) {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function (keyCode) {
    //Move player up
    if (keyCode === 'up') {
        if (this.y > 30) {
            this.y -= 82;
        }
    }
    if (keyCode === 'down') {
        if (this.y < 390) {
        this.y += 82;
    }
    }
    if (keyCode === 'left') {
        if (this.x > 20) {
        this.x -= 73;
    }
    }
    if (keyCode === 'right') {
        if (this.x < 350) {
        this.x += 73;
    }
    }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];
// Spawn them in the game world
for (var i = 0; i < allEnemies.length; i++) {
    allEnemies[i].visible();
}
// Place the player object in a variable called player
var player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
