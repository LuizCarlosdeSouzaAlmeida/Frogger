// INIMIGOS
var Enemy = function(x, y, dv) {
    // variáveis inimigos
    this.x = x;
    this.y = y;
    this.dv = (Math.random() * 250)+100;
    this.sprite = 'images/enemy-bug.png';
};
Enemy.prototype.update = function(dt) {
    //S=S0+dv*dt
    this.x += this.dv*dt;
    if(this.x > 500){
      this.x = -100;
      this.dv = (Math.random() * 350)+100;
    }
};
// Desenha os inimigos na tela.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// PLAYER
var Player = function () {
  // variáveis player
  this.x = 200;
  this.y = 380;
  this.sprite = 'images/char-boy.png'
  this.score = 0;
  this.lifes = 3;
}
Player.prototype.update = function (){
//Verifica se o jogador chegou na água
  if(this.y < 10){
    this.score += 100;
    this.x = 200;
    this.y = 380;
  }
//verifica se as vidas acabaram e alerta GAME OVER e o score final
  if(this.lifes<=0){
    alert("GAME OVER\n"+"SCORE:  "+this.score);
    location.reload();
  }
}
// Desenha os inimigos na tela.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};
// Recebe uma string com a direção da tecla pressionada
// e atualiza a localizaçao do jogador.
Player.prototype.handleInput = function (key) {
  function stepLeft(player) {
    player.x -= 100;
    player.x = Math.max(player.x, 0);
  }
  function stepRight(player) {
    player.x += 100;
    player.x = Math.min(player.x, 400);
  }
  function stepUp(player) {
    player.y -= 83;
    player.y = Math.max(player.y, -10);
  }
  function stepDown(player) {
    player.y += 83;
    player.y = Math.min(player.y, 380);
  }
  switch (key) {
    case 'left':
    stepLeft(this);
    break;
    case 'right':
    stepRight(this);
    break;
    case 'up':
    stepUp(this);
    break;
    case 'down':
    stepDown(this);
    break;
  }
  this.render();
}
// DECLARAÇÃO DE VARIÁVEIS
var allEnemies = [new Enemy(0,48),new Enemy(0,131),new Enemy(0,131),new Enemy(0,214)];
var player = new Player();
// Escuta eventos do teclado e chama "player.handleInput" como o parametro "key".
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});
