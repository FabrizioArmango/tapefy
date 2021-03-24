var Model = require('./model');

var PlayerModel = function(data) {
  Model.call(this, data)
};

PlayerModel.prototype = Object.create(Model.prototype);
PlayerModel.prototype.constructor = PlayerModel;

module.exports = PlayerModel;
