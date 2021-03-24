var Model = require('./model');

var CardSongModel = function(data) {
  Model.call(this, data);
};

CardSongModel.prototype = Object.create(Model.prototype);
CardSongModel.prototype.constructor = CardSongModel;


module.exports = CardSongModel;
