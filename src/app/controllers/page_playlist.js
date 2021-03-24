var
    PagePlaylistModel = require( '../models/page_playlist_model' ),
    PagePlaylistView = require( '../views/page_playlist_view' );

var
    PageBaseController = require( './page_basecontroller' );

var
    db = require( './db' );

var PagePlaylistController = function( options )
{
    options = Object.assign(
    {
        dict: options.dict,
        title: 'Le mie Playlists',
        author: 'Fabrizio Armango',
        copyright: 'Fabrizio Armango',
        description: 'pagina HTML5 di esempio per uso dei tag semantici'
    }, options );
    PageBaseController.call( this, options );

    console.log( "PagePlaylistController.constructor" );
    this.model = new PagePlaylistModel(
        options );

    if ( options )
    {
        this.model.session = options.session;
    }

    console.log( "this.model" );
    console.log( this.model );
    this.view = new PagePlaylistView( this.model );
    console.log( "this.view" );
    console.log( this.view );


    this.navBar.page = 'playlists';
};

PagePlaylistController.prototype = Object.create( PageBaseController.prototype );
PagePlaylistController.prototype.constructor = PagePlaylistController;
PagePlaylistController.prototype.render = function( onReadyCallback )
{
    console.log( "PagePlaylistController.render" );
    var t = this;
    /*
    if ( this.model.session.login )
    {*/
        db.getMyPlaylists( this.model.session.user.id, function( dbResponse )
        {
            if ( dbResponse.statusCode === db.NO_ROWS_FOUND )
            {
                t.model.playlists = [];
            }
            else if ( dbResponse.statusCode === db.RESULT_WAS_FOUND )
            {
                console.log( dbResponse );
                t.model.playlists = dbResponse.rows.map( function( playlistData )
                {
                    return {
                        id: playlistData.id,
                        name: playlistData.name,
                        desc: playlistData.description,
                        visibility: playlistData.visibility,
                    }
                } );
            }

            PageBaseController.prototype.render.call( t, function()
            {
                onReadyCallback( t.view.render() );
            } );
        } );
    /*}

    else
    {
        PageBaseController.prototype.render.call( t, function()
        {
            onReadyCallback( t.view.render() );
        } );
    }*/
};

module.exports = PagePlaylistController;
