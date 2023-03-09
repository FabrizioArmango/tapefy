var PlayerModel = require('../models/player_model');
var PlayerView = require('../views/player_view');

var PlayerController = function() {
  this.model = new PlayerModel();
  this.view = new PlayerView();
};

PlayerController.prototype.constructor = PlayerController;
PlayerController.prototype.render = function() {
  return this.view.render();
};

module.exports = PlayerController;
