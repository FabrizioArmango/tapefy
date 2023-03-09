var PageHTML5View = require( './page_html5_view' );
var NavBarView = require( './navbar_view' );


var PageBaseView = function( model )
{
    PageHTML5View.call( this, model );
    this.model = model;
    console.log( "PageBaseView.constructor" );
};

PageBaseView.prototype = Object.create( PageHTML5View.prototype );
PageBaseView.prototype.constructor = PageBaseView;
PageBaseView.prototype.render = function()
{
    console.log( "PageBaseView.render" );

    if ( undefined === this.model.html.navbar )
    {
        this.model.html.navbar = new NavBarView(
        {
            items: [
            {
                id: "home",
                href: "/home",
                text: "Home"
            },
            {
                id: "login",
                href: "/login",
                text: "Login"
            },
            {
                id: "register",
                href: "/register",
                text: "Registrati"
            },
            {
                id: "playlists",
                href: "/playlist",
                text: "Playlists"
            } ]
        } ).render();
    }

    if ( undefined === this.model.stylesheets )
    {
        this.model.stylesheets = [];
    }
    this.model.stylesheets.push( 'https://fonts.googleapis.com/css?family=Fredoka+One&display=swap' );
    this.model.stylesheets.push( '/lib/app.css' );


    this.model.body =
        this.model.html.navbar +
        //'<main class="container p-3 p-sm-3 p-lg-5 p-xl-5 mt-5" style="min-height: calc(100vh - 56px);">' +
        '<main class="container p-3 p-sm-3 p-lg-5 p-xl-5 mt-5">' +
        `<div class="row pl-4">
      <h1>${this.model.title}</h1>
    </div>` +
        '<div class="container p-1 p-sm-2 p-lg-5 p-xl-5">' +
        this.model.html.content +
        '</div>' +
        this.model.html.player +
        '</main>' +
        this.model.html.footer;
    return PageHTML5View.prototype.render.call( this );
};

PageBaseView.prototype.renderUnauthorized = function()
{
    console.log( "PageBaseView.renderUnauthorized" );
    console.log( this );
    if ( undefined === this.model )
    {
        this.model = {};
    }
    if ( undefined == this.model.html )
    {
        this.model.html = {
            navbar: undefined,
            player: '',
            footer: '',
            content: ''
        }
    }
    this.model.title = 'Pagina Privata';
    this.model.html.content = `<p>Non hai i permessi necessari per visualizzare il contenuto di questa pagina.</p>`;
    this.model.html.content += `Effettua l'<a href="/login"><b>accesso</b></a> o <a href="/register"><b>registrati</b></a>.`;

    this.model.html.content += `
      <script>
      setTimeout(function() {
        window.location.href = '/home';
      }, 5000);
      </script>`;

    return PageBaseView.prototype.render.call( this );
};

module.exports = PageBaseView;
