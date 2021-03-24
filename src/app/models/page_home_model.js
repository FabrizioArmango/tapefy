var PageBaseModel = require('./page_basemodel');

var PageHomeModel = function(data) {
  PageBaseModel.call(this, data);
  console.log("PageHomeModel.constructor");
};

PageHomeModel.prototype = Object.create(PageBaseModel.prototype);
PageHomeModel.prototype.constructor = PageHomeModel;

module.exports = PageHomeModel;
