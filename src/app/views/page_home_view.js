var PageBaseView = require('./page_baseview');


var PageHomeView = function(model) {
  PageBaseView.call(this, model);
  console.log("PageHomeView.constructor");
};

PageHomeView.prototype = Object.create(PageBaseView.prototype);
PageHomeView.prototype.constructor = PageHomeView;
PageHomeView.prototype.render = function() {
  console.log("PageHomeView.render");

  this.model.html.content = '<h5>Entra a far parte della community</h5>!';

  return PageBaseView.prototype.render.call(this);
};

module.exports = PageHomeView;
