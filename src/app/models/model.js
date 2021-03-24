var Model = function(data) {
  if (data) {
    var self = this;
    Object.keys(data).forEach(function(propKey) {
      self[propKey] = data[propKey]
    });
  }
  this.html = {};
}

Model.prototype.constructor = Model;

module.exports = Model;
