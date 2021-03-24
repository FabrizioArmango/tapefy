var PageBaseModel = require('./page_basemodel');

var PageNotFoundModel = function(data) {
  PageBaseModel.call(this, data);
  console.log("PageNotFoundModel.constructor");
};

PageNotFoundModel.prototype = Object.create(PageBaseModel.prototype);
PageNotFoundModel.prototype.constructor = PageNotFoundModel;

module.exports = PageNotFoundModel;
