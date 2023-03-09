var Controller = function() {

};

Controller.prototype.constructor = Controller;
Controller.prototype.render = function() {
  return this.view.render(this.model);
}

module.exports = Controller;
