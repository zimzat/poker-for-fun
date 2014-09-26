/*jslint vars: true*/
/*global Game */

(function () {
	'use strict';
	
	var me;

	var state = {
		players: [
			{
				name: 'Player 1',
				active: true,
				moneyReserves: 25000,
				moneyBet: 0,
				buyinRemaining: 0,
				cards: [null, null]
			},
			{
				name: 'Player 2',
				active: true,
				moneyReserves: 24000,
				moneyBet: 1000,
				buyinRemaining: 0,
				cards: [null, null]
			},
			{
				name: 'Player 3',
				active: true,
				moneyReserves: 23000,
				moneyBet: 2000,
				buyinRemaining: 0,
				cards: [null, null]
			},
			{
				name: 'Player 4',
				active: true,
				moneyReserves: 25000,
				moneyBet: 0,
				buyinRemaining: 0,
				cards: ['1-2', '2-4']
			},
			{
				name: 'Player 5',
				active: true,
				moneyReserves: 25000,
				moneyBet: 0,
				buyinRemaining: 0,
				cards: [null, null]
			}
		],
		game: {
			playerDealer: 1,
			playerSmallBlind: 2,
			playerBigBlind: 3,
			playerMaxBetter: 3,
			playerPendingResponse: 4,
			playerYou: 4,
			moneyPool: 0,
			moneyBetMax: 2000,
			moneyBlind: 2000,
			communityCards: ['1-0', '1-1', '1-2']
		}
	};
	var you = state.players[state.game.playerYou - 1];

	Game.Game = {
		create: function() {
			me = window.me = this;

			me.game.stage.backgroundColor = '#009900';

			var textStyle = {font: 'Bold 16px Arial'},
				cardWidth = me.cache.getImage('card-back').width,
				cardHeight = me.cache.getImage('card-back').height;

			// Show player status
			me.gPlayers = me.add.group();
			state.players.forEach(function(player, p) {
				var gPlayer = me.add.group(me.gPlayers);
				
				gPlayer.statusChip = gPlayer.create(0, 0, 'chip-dealer');
				if (state.game.playerDealer === p + 1) {
					gPlayer.statusChip.loadTexture('chip-dealer');
				} else if (state.game.playerBigBlind === p + 1) {
					gPlayer.statusChip.loadTexture('chip-big-blind');
				} else if (state.game.playerSmallBlind === p + 1) {
					gPlayer.statusChip.loadTexture('chip-small-blind');
				} else {
					gPlayer.statusChip.visible = false;
				}

				for (var c = 0; c <= 1; c++) {
					gPlayer['sCard' + c] = gPlayer.create((c + 1) * (cardWidth + 5), 0, 'card-back');
					if (!player.cards) {
						gPlayer['sCard' + c].kill();
					} else if (player.cards[c]) {
						gPlayer['sCard' + c].loadTexture('card-' + player.cards[c]);
					}
				}

				gPlayer.tName = me.add.text(15 + cardWidth * 3, 0, player.name, textStyle, gPlayer);
				gPlayer.tMoney = me.add.text(20 + cardWidth * 3, gPlayer.tName.height, player.moneyReserves, textStyle, gPlayer);
				gPlayer.tBet = me.add.text(20 + cardWidth * 3, gPlayer.tName.height * 2, player.moneyBet, textStyle, gPlayer);

				gPlayer.position.set(0, (gPlayer.height + 10) * p);
			});
			me.gPlayers.position.set(20, 20);

			me.gCommunityCards = me.add.group();
			for (var i = 0; i < 5; i++) {
				me.gCommunityCards.create(i * cardWidth + i * 5, 0, 'card-' + (state.game.communityCards[i] ? state.game.communityCards[i] : 'back'));
				if (!state.game.communityCards[i]) {
					me.gCommunityCards.getAt(i).alpha = 0;
				}
			}
			me.gCommunityCards.position.set(me.game.width - me.gCommunityCards.width - 20, me.game.height - cardHeight - 20);

			// Show possible actions
			me.gActions = me.add.group();
			me.gActions.tFold = me.add.text(0, 0, 'Fold', null, me.gActions);
			me.gActions.tCheckCall = me.add.text(0, 1 * me.gActions.tFold.height, 'Call', null, me.gActions);
			me.gActions.tRaise = me.add.text(0, 2 * me.gActions.tFold.height, 'Raise', null, me.gActions);
			me.gActions.tAllIn = me.add.text(0, 3 * me.gActions.tFold.height, 'All In', null, me.gActions);
			me.gActions.position.set(20, me.game.height - me.gActions.height - 20);
			me.gActions.setAll('inputEnabled', true);
			me.gActions.callAll('events.onInputDown.add', 'events.onInputUp', handlePlayerAction);
			if (state.game.playerYou !== state.game.playerPendingResponse) {
				me.gActions.visible = false;
			} else {
				showActions();
			}

			// Show FPS
			me.time.advancedTiming = true;
			me.fpsText = me.add.text(
				me.game.width - 100, 20, '', { font: '16px Arial', fill: '#ffffff' }
			);
		},

		update: function() {
			if (this.time.fps !== 0) {
				this.fpsText.setText(this.time.fps + ' FPS');
			}

			// This function is called 60 times per second
			// It contains the game's logic
		}
	};

	function showActions() {
		if (state.game.moneyBetMax !== you.moneyBet) {
			me.gActions.tFold.text = 'Fold (' + you.moneyBet + ')';
			me.gActions.tFold.visible = true;
		} else {
			me.gActions.tFold.visible = false;
		}
		if (state.game.moneyBetMax === you.moneyBet) {
			me.gActions.tCheckCall.text = 'Check';
		} else {
			me.gActions.tCheckCall.text = 'Call (' + (state.game.moneyBetMax - you.moneyBet) + ')';
		}
		if (state.game.moneyBetMax >= you.moneyBet + you.moneyReserves) {
			me.gActions.tRaise.visible = false;
		} else {
			me.gActions.tRaise.visible = true;
		}
		me.gActions.hasData
		me.gActions.tAllIn.text;
	}

	function handlePlayerAction(item) {
		if (state.game.playerPendingResponse !== state.game.playerYou) {
			return;
		}

		switch (true) {
			case item === me.gActions.tFold:
				console.log('Fold');

				// This would be handler server-side and a game-state removing the player would be returned.
				me.gPlayers.getAt(state.game.playerYou - 1).visible = false;
				me.gActions.visible = false;
				break;

			case item === me.gActions.tCheckCall:
				console.log('Check/Call');
				break;

			case item === me.gActions.tRaise:
				console.log('Raise');
				break;

			case item === me.gActions.tAllIn:
				console.log('All In');
				break;
		}
	}

})();
