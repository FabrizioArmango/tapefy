var Controller = require('./controller');

var FooterModel = require('../models/footer_model');
var FooterView = require('../views/footer_view');

var FooterController = function() {
  Controller.call(this);
  this.model = new FooterModel();
  this.view = new FooterView();
};

FooterController.prototype = Object.create(Controller.prototype);
FooterController.prototype.constructor = FooterController;


module.exports = FooterController;
