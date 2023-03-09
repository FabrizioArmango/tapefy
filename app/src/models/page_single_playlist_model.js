var PageBaseModel = require('./page_basemodel');

var PageSinglePlaylistModel = function(data) {
  PageBaseModel.call(this, data);
  console.log("PageSinglePlaylistModel.constructor");
};

PageSinglePlaylistModel.prototype = Object.create(PageBaseModel.prototype);
PageSinglePlaylistModel.prototype.constructor = PageSinglePlaylistModel;

module.exports = PageSinglePlaylistModel;
