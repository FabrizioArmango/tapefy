var PageBaseModel = require('./page_basemodel');

var PagePlaylistModel = function(data) {
  PageBaseModel.call(this, data);
  console.log("PagePlaylistModel.constructor");
};

PagePlaylistModel.prototype = Object.create(PageBaseModel.prototype);
PagePlaylistModel.prototype.constructor = PagePlaylistModel;

module.exports = PagePlaylistModel;
