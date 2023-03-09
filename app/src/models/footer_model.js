var Model = require('./model');

var FooterModel = function(data) {
  Model.call(this, data);
};

FooterModel.prototype = Object.create(Model.prototype);
FooterModel.prototype.constructor = FooterModel;

module.exports = FooterModel;
