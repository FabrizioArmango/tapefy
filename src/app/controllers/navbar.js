var Controller = require('./controller');

var NavBarModel = require('../models/navbar_model');
var NavBarView = require('../views/navbar_view');

var NavBarController = function(options) {
  Controller.call(this);
  this.model = new NavBarModel(options);
  this.view = new NavBarView(this.model);

  this.model.shouldShowLogout = options && options.shouldShowLogout;
};

NavBarController.prototype = Object.create(Controller.prototype);
NavBarController.prototype.constructor = NavBarController;
Object.defineProperty(NavBarController.prototype, 'page', {
  get() {
    return this.model.page;
  },
  set(v) {
    this.model.page = v;
  }
});

Object.defineProperty(NavBarController.prototype, 'items', {
  get() {
    return this.model.items;
  },
  set(v) {
    this.model.items = v;
  }
});


module.exports = NavBarController;
