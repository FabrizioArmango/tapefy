var PageBaseView = require('./page_baseview');

var PageRegisterView  = function(model) {
  PageBaseView.call(this, model);
  console.log("PageRegisterView.constructor");
};

PageRegisterView.prototype = Object.create(PageBaseView.prototype);
PageRegisterView.prototype.constructor = PageRegisterView;
PageRegisterView.prototype.render = function() {
  console.log("PageRegisterView.render");
  this.model.html.content = `
  <form action="/register" method="post">
    <div class="form-group ">
      <label for="exampleInputPassword1">Nome</label>
      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Nome" name="first_name">
    </div>
    <div class="form-group ">
      <label for="exampleInputPassword1">Cognome</label>
      <input type="text" class="form-control" id="exampleInputPassword1" placeholder="Cognome" name="last_name">
    </div>
    <div class="form-group ">
      <label for="exampleInputEmail1">Indirizzo Email</label>
      <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" name="email">
      <small id="emailHelp" class="form-text text-muted">We'll never share your email with anyone else.</small>
    </div>
    <div class="form-group ">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password">
    </div>
    <div class="form-group ">
      <label for="exampleInputPassword1">Password</label>
      <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" name="password_confirm">
    </div>
    <div class="form-group ">
      <label for="exampleInputPassword1">Data di Nascita</label>
      <input type="date" class="form-control" id="exampleInputPassword1" placeholder="Password" name="birth_date">
    </div>
    <div class="form-row justify-content-end ">
      <button type="submit" class="btn btn-primary">Registrati</button>
    </div>
  </form>
  `;

  return PageBaseView.prototype.render.call(this);
};

module.exports = PageRegisterView;
