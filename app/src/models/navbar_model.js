var Model = require('./model');

var NavBarModel = function(data) {
  Model.call(this, Object.assign({
    items: []
  },data));
};

NavBarModel.prototype = Object.create(Model.prototype);
NavBarModel.prototype.constructor = NavBarModel;


module.exports = NavBarModel;
