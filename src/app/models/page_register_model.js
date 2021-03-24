var PageBaseModel = require('./page_basemodel');

var PageRegisterModel = function(data) {
  PageBaseModel.call(this, data);
  console.log("PageRegisterModel.constructor");
};

PageRegisterModel.prototype = Object.create(PageBaseModel.prototype);
PageRegisterModel.prototype.constructor = PageRegisterModel;

module.exports = PageRegisterModel;
