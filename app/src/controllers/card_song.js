var Controller = require('./controller');

var CardSongModel = require('../models/card_song_model');
var CardSongView = require('../views/card_song_view');

var CardSongController = function(data) {
  Controller.call(this);
  this.model = new CardSongModel(data);
  this.view = new CardSongView(this.model);
};

CardSongController.prototype = Object.create(Controller.prototype);
CardSongController.prototype.constructor = CardSongController;

module.exports = CardSongController;
