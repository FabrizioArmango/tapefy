var PageBaseModel = require('./page_basemodel');

var PageSearchResultModel = function(data) {
  PageBaseModel.call(this, data);
  console.log("PageSearchResultModel.constructor");
};

PageSearchResultModel.prototype = Object.create(PageBaseModel.prototype);
PageSearchResultModel.prototype.constructor = PageSearchResultModel;

module.exports = PageSearchResultModel;
