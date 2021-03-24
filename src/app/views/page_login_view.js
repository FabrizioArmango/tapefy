

var PageBaseView = require( './page_baseview' );

var PageLoginView = function( model )
{
    PageBaseView.call( this, model );
    console.log( "PageLoginView.constructor" );
};

PageLoginView.prototype = Object.create( PageBaseView.prototype );
PageLoginView.prototype.constructor = PageLoginView;
PageLoginView.prototype.render = function()
{
    console.log( "PageLoginView.render" );
    if (undefined === this.model.session || !this.model.session.login )
    {
        this.model.html.content = `
    <form action="/login" method="post">
      <div class="form-group">`;
        if ( this.model.shouldShowAlert )
        {
            if ( this.model.isEmailMissing )
            {
                this.model.html.content += `
                <div class="alert alert-danger" role="alert">
                  ${this.model.dict.login.alerts.email_missing}
                </div>
              `;
            }
            else if ( !this.model.isEmailValid )
            {
                this.model.html.content += `
                <div class="alert alert-danger" role="alert">
                  ${this.model.dict.login.alerts.email_not_valid}
                </div>
              `;
            }
            else if ( this.model.isEmailNotFound )
            {
                this.model.html.content += `
                <div class="alert alert-danger" role="alert">
                  ${this.model.dict.login.alerts.email_not_exists} <a href="/register" class="alert-link">${this.model.dict.register.title}</a>.
                </div>
              `;
            }
        }
        else
        {
            this.model.html.content += `<label for="form-email-input">${this.model.dict.login.form_email_input.label}</label>`;
        }

        this.model.html.content += `<input type="email" class="form-control" id="form-email-input" aria-describedby="emailHelp" placeholder="${this.model.dict.login.form_email_input.placeholder}" name="email" value="${this.model.email}">
      </div>






      <div class="form-group">`;
        if ( this.model.shouldShowAlert )
        {
            if ( this.model.isPasswordMissing )
            {
                this.model.html.content += `
                <div class="alert alert-danger" role="alert">
                  Non hai inserito nessuna password.
                </div>
              `;
            }
            else if ( this.model.isPasswordWrong )
            {
                this.model.html.content += `
                <div class="alert alert-danger" role="alert">
                  Hai inserito una password errata.
                </div>
              `;
            }
        }

        this.model.html.content += `
        <label for="form-password-input">Password</label>
        <input type="password" class="form-control" id="form-password-input" placeholder="Password" name="password">
      </div>
      <div class="form-row justify-content-end">
        <button type="submit" class="btn btn-primary">Accedi</button>
      </div>
    </form>
    `;
  } else {
    this.model.html.content = `
    <h2> Bentornato ! </h2>
    <div class="alert alert-success" role="alert">
      Hai effettuato l'accesso.
    </div>
    <script>
    setTimeout(function() {
      window.location.href = '/home';
    }, 1500);
    </script>
    `;
  }



    return PageBaseView.prototype.render.call( this );
};

module.exports = PageLoginView;
