
Game.Preloader = {
	preload: function() {
		this.stage.backgroundColor = '#16181a';

		this.preloadBg = this.add.sprite((this.game.width-this.game.cache.getImage('preloaderBg').width)/2, (this.game.height-this.game.cache.getImage('preloaderBg').height)/2, 'preloaderBg');
		this.preloadBar = this.add.sprite((this.game.width-this.game.cache.getImage('preloaderBar').width)/2, (this.game.height-this.game.cache.getImage('preloaderBar').height)/2, 'preloaderBar');
		this.load.setPreloadSprite(this.preloadBar);

		for (var s = 1; s <= 4; s++) {
			for (var n = 0; n < 13; n++) {
				game.load.image('card-' + s + '-' + n, 'assets/classic-cards/' + (n * 4 + s) + '.png');
			}
		}
		game.load.image('card-back', 'assets/classic-cards/b1fv.png');

		game.load.image('chip-dealer', 'assets/chip-dealer.png');
		game.load.image('chip-big-blind', 'assets/chip-big-blind.png');
		game.load.image('chip-small-blind', 'assets/chip-small-blind.png');
	},

	create: function() {
		this.state.start('Game');
	}
};
