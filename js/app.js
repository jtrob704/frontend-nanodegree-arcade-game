// Enemies our player must avoid
var Enemy = function (lane) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.height = 50;
    this.width = 50;
    this.y = -20 + (lane * 80);
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (dt * 100 + this.speed);

    /* Axis-aligned bounding box collision detection based on code from
     * Mozilla developer network: 
     * https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection
     */
    if (this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.height + this.y > player.y) {
        player.reset();
    }
    //If enemy goes off screen reset with a new speed value.
    if (this.x > 615) {
        this.reset();
    }
};

//Redraw enemies off screen with a new speed value
Enemy.prototype.reset = function () {
    this.x = -20;
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
    this.height = 50;
    this.width = 50;
    this.x = 200;
    this.y = 400;

};

// If player reaches the water invoke player reset method
Player.prototype.update = function (dt) {
    if (this.y < 50) {
        this.reset();
    }
};

// Resets player to initial start position
Player.prototype.reset = function () {
    this.x = 200;
    this.y = 400;
};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Handle input from keyboard arrow keys
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
// 
for (var i = 0; i < allEnemies.length; i++) {
    allEnemies[i].reset();
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