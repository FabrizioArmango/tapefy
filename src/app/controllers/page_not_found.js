var
  PageNotFoundModel = require('../models/page_not_found_model'),
  PageNotFoundView = require('../views/page_not_found_view');

var
  PageBaseController = require('./page_basecontroller');

var PageNotFoundController = function(options) {
  options = Object.assign({
    title: options.dict.not_found.title,
    author: 'Fabrizio Armango',
    copyright: 'Fabrizio Armango',
    description: 'pagina HTML5 di esempio per uso dei tag semantici'
  }, options);

  PageBaseController.call(this, options);

  console.log("PageNotFoundController.constructor");
  this.model = new PageNotFoundModel(options);


  console.log("this.model");
  console.log(this.model);
  this.view = new PageNotFoundView(this.model);
  console.log("this.view");
  console.log(this.view);


  this.navBar.page = '';
};

PageNotFoundController.prototype = Object.create(PageBaseController.prototype);
PageNotFoundController.prototype.constructor = PageNotFoundController;
PageNotFoundController.prototype.render = function(onReadyCallback) {
  console.log("PageNotFoundController.render");
  var t = this;
  PageBaseController.prototype.render.call(t, function() {
    onReadyCallback(t.view.render());
  });
};

module.exports = PageNotFoundController;
