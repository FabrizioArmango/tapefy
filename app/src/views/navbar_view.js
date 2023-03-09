var NavBarView = function(model) {
  this.model = model;
};

NavBarView.prototype.constructor = NavBarView;
NavBarView.prototype.render = function() {
  var self = this;
  return `
  <nav class="navbar navbar-expand-lg navbar-light bg-light w-100" style="position: fixed; top: 0;">
  <a class="navbar-brand" href="/home">Tapefy</a>


  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="navbarContent" aria-controls="navbarContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>


  <div class="collapse navbar-collapse mt-3 mt-md-0 mt-lg-0"" id="navbarContent">
    <ul class="navbar-nav mr-auto">
    ${self.model.items ? self.model.items.map(function(item) {
      return `<li class="nav-item text-right mr-1-xs mr-sm-2 mr-md-2 ${item.id === self.model.page ? "active" : ""}">
      <a class="nav-link" href="${item.href}">${item.text}</a>
      </li>`;
    }).join("") : ''}
    </ul>
    <form class="form-inline mt-2 my-lg-0 justify-content-end" action="/search" method="post">
      <input class="form-control mr-sm-2" type="search" name="query" placeholder="Search" aria-label="Search">
      <button class="btn btn-outline-success my-2 my-sm-0" href="/search" type="submit">Search</button>
    </form>
  </div>
  ${self.model.shouldShowLogout ? `<div class="d-flex ml-xl-5 ml-lg-5 ml-md-0 ml-sm-0 ml-0"><a href="/logout"><i class="fa fa-sign-out fa-2x logout"></i></a></div>` : ''}
</nav>
<script src="/lib/navbar.js"></script>`;
};

module.exports = NavBarView;
