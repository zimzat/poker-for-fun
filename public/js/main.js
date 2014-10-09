
var game = new Phaser.Game(1024, 768, Phaser.AUTO);

game.state.add('Boot', Game.Boot);
game.state.add('Preloader', Game.Preloader);
game.state.add('Lobby', Game.Lobby);
game.state.add('Table', Game.Table);
game.state.add('Game', Game.Game);

game.state.start('Boot');
