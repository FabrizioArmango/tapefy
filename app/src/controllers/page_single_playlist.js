var
    PageSinglePlaylistModel = require( '../models/page_single_playlist_model' ),
    PageSinglePlaylistView = require( '../views/page_single_playlist_view' );

var
    PageBaseController = require( './page_basecontroller' );

var db = require( './db' );

var PageSinglePlaylistController = function( options )
{
    options = Object.assign(
    {
        dict: options.dict,
        title: 'Nome playlist',
        author: 'Fabrizio Armango',
        copyright: 'Fabrizio Armango',
        description: 'pagina HTML5 di esempio per uso dei tag semantici'
    }, options );
    PageBaseController.call( this, options );
    console.log( "PageSinglePlaylistController.constructor" );
    this.model = new PageSinglePlaylistModel( options );

    console.log( options );
    if ( options )
    {
        this.model.data = options.data;
        this.model.session = options.session;
        if ( options.playlistId )
        {
            this.model.playlistId = options.playlistId;
        }
        else
        if ( options.data && options.data.playlist_id )
        {
            this.model.playlistId = options.data.playlist_id;
            this.model.shouldBeEdited = options.shouldBeEdited;
        }
        else
        {
            this.model.isNew = true;
        }
    }

    console.log( "this.model" );
    console.log( this.model );
    this.view = new PageSinglePlaylistView( this.model );
    console.log( "this.view" );
    console.log( this.view );


    this.navBar.page = 'playlists';
};

PageSinglePlaylistController.prototype = Object.create( PageBaseController.prototype );
PageSinglePlaylistController.prototype.constructor = PageSinglePlaylistController;
PageSinglePlaylistController.prototype.render = function( onReadyCallback )
{
    console.log( "PageSinglePlaylistController.render" );
    var t = this;

    if ( t.model.isNew )
    {
        t.model.title = 'Nuova playlist';
        if ( t.model.data )
        {
            var d = t.model.data;
            if ( d.name !== "" )
            {
                t.model.isNameInvalid = false;
            }
            if ( d.desc.length <= 60 )
            {
                t.model.isDescTooLong = false;
            }
            if ( d.name !== "" && d.desc.length <= 60 )
            {
                db.createPlaylist(
                {
                    name: d.name,
                    desc: d.desc,
                    userId: t.model.session.user.id,
                    visibility: d.visibility
                } );
            }
        }
        PageBaseController.prototype.render.call( t, function()
        {
            onReadyCallback( t.view.render() );
        } );
    } // edit was here
    else
    {
        db.getPlaylist( t.model.playlistId, function( dbResponse )
        {
            if ( dbResponse.statusCode === db.RESULT_WAS_FOUND )
            {
                var playlistData = dbResponse.rows[ 0 ];
                console.log( "playlistData: " );
                console.log( playlistData.tracks );
                t.model.db = {
                    id: playlistData.playlist_id,
                    name: playlistData.name,
                    desc: playlistData.description,
                    visibility: playlistData.visibility,
                    createdBy: playlistData.created_by,
                    tracks: playlistData.tracks

                };
                t.model.createdBy = playlistData.created_by;
                t.model.title = 'Playlist ' + playlistData.name;
            }
            else if ( dbResponse.statusCode === db.ERROR_PLAYLIST_NOT_EXISTS )
            {
                console.log( 'Playlist inesistente' );
                t.model.isPlaylistNotFound = true;
                t.model.title = 'Playlist inesistente';
            }
            PageBaseController.prototype.render.call( t, function()
            {
                onReadyCallback( t.view.render() );
            } );
        } );
    }
};

module.exports = PageSinglePlaylistController;
