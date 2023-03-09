var
    NavBar = require( './navbar' ),
    Footer = require( './footer' ),
    Player = require( './player' );

var PageBaseController = function( options )
{
    if ( options )
    {
        options.shouldShowLogout = ( options.session && options.session.login ) ? options.session.login : false;
    }
    this.navBar = new NavBar( options );
    this.footer = new Footer( options );


    this.navBar.items = [
    {
        id: "home",
        href: "/home",
        text: "Home"
    } ];


    if ( undefined === options || undefined === options.session || undefined === options.session.login || false === options.session.login )
    {
        this.navBar.items.push(
        {
            id: "login",
            href: "/login",
            text: "Login"
        },
        {
            id: "register",
            href: "/register",
            text: "Registrati"
        } );
    }
    this.navBar.items.push(
    {
        id: "playlists",
        href: "/playlist",
        text: "Playlists"
    },
    {
        id: "community",
        href: "/community",
        text: "Community"
    } );

    this.player = new Player( options );
};


PageBaseController.prototype.constructor = PageBaseController;
PageBaseController.prototype.render = function( onReadyCallback )
{
    console.log( "PageBaseController.render" );
    this.model.html.navbar = this.navBar.render();
    this.model.html.player = this.player.render();
    this.model.html.footer = this.footer.render();
    onReadyCallback();
};

module.exports = PageBaseController;
