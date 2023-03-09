var PageBaseModel = require('./page_basemodel');

var PageLoginModel = function(data) {
  PageBaseModel.call(this, Object.assign({
    email: '',

    isEmailMissing: true,
    isEmailValid: false,
    isEmailNotFound: true,

    isPasswordMissing: true,
    isPasswordWrong: true,


    shouldShowAlert: false
  }, data));
  console.log("PageLoginModel.constructor");
};

PageLoginModel.prototype = Object.create(PageBaseModel.prototype);
PageLoginModel.prototype.constructor = PageLoginModel;

module.exports = PageLoginModel;
