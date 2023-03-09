var
  PageHomeModel = require('../models/page_home_model'),
  PageHomeView = require('../views/page_home_view');

var
  PageBaseController = require('./page_basecontroller');

var PageHomeController = function(options) {
  options = Object.assign({
    dict: options.dict,
    title: 'Home Page',
    author: 'Fabrizio Armango',
    copyright: 'Fabrizio Armango',
    description: 'pagina HTML5 di esempio per uso dei tag semantici',
  }, options);

  PageBaseController.call(this, options);

  console.log("PageHomeController.constructor");
  this.model = new PageHomeModel(options);
  this.model.session = options.session;
  console.log("this.model");
  console.log(this.model);
  this.view = new PageHomeView(this.model);
  console.log("this.view");
  console.log(this.view);

  this.navBar.page = 'home';
};

PageHomeController.prototype = Object.create(PageBaseController.prototype);
PageHomeController.prototype.constructor = PageHomeController;
PageHomeController.prototype.render = function(onReadyCallback) {
  console.log("PageHomeController.render");
  var t = this;
  PageBaseController.prototype.render.call(t, function() {
    onReadyCallback(t.view.render());
  });
};

module.exports = PageHomeController;
