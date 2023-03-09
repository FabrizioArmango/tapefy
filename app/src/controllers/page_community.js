
var
    db = require( './db' );

var
  PageCommunityModel = require('../models/page_community_model'),
  PageCommunityView = require('../views/page_community_view');

var
  PageBaseController = require('./page_basecontroller');

var PageCommunityController = function(options) {
  options = Object.assign({
    title: 'Community Page',
    author: 'Fabrizio Armango',
    copyright: 'Fabrizio Armango',
    description: 'pagina HTML5 di esempio per uso dei tag semantici'
  }, options);
  PageBaseController.call(this, options);

  console.log("PageCommunityController.constructor");
  this.model = new PageCommunityModel(options);
  this.model.session = options.session;
  console.log("this.model");
  console.log(this.model);
  this.view = new PageCommunityView(this.model);
  console.log("this.view");
  console.log(this.view);

  this.navBar.page = 'community';
};



PageCommunityController.prototype = Object.create(PageBaseController.prototype);
PageCommunityController.prototype.constructor = PageCommunityController;
PageCommunityController.prototype.render = function(onReadyCallback) {
  console.log("PageCommunityController.render");
  var t = this;

  PageBaseController.prototype.render.call(t, function() {
    db.getOnlineUsers(t.model.session.user.id, function(dbResponse) {
      console.log(dbResponse);
      t.model.users = dbResponse.rows;
      onReadyCallback(t.view.render());
    });
  });
};

module.exports = PageCommunityController;
