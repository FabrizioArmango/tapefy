var PageBaseModel = require('./page_basemodel');

var PageCommunityModel = function(data) {
  PageBaseModel.call(this, data);
  console.log("PageCommunityModel.constructor");
};

PageCommunityModel.prototype = Object.create(PageBaseModel.prototype);
PageCommunityModel.prototype.constructor = PageCommunityModel;

module.exports = PageCommunityModel;
