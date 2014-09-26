Poker, for fun
=============

This is the beginning of a project to create a multiplayer game of Texas Hold'em Poker which can include AI players to fill slots.

This is a purely for fun project and game. There are many games to play poker with other humans, often for real money, and many games to play poker with Bots, but very few to play poker with humans and bots. A friend and I have been keeping Dead Rising 2 loaded just to play poker together from time to time but the bots are quite insane, often going all-in before even the flop goes down. Thus, the birth of this project.

Currently only the client-side display of the game state is implemented. There are still many aspects left to be implented for both server-side and client-side functionality before this is a playable game.

Client-side:

* Send user Game actions to the server.
* Receive game state updates and animate the change on the client.
* Implement a lobby listing and entrance interface.

Server-side:

* User entrance and logging.
* Lobby creation and game setup.
* Game setup, card management, shuffling, etc.

See: design.txt for more design notes.
