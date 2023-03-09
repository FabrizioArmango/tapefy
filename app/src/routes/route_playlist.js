var express = require( 'express' );
var router = express.Router();

var db = require( '../controllers/db' );
var PagePlaylist = require( '../controllers/page_playlist' );
var PageSinglePlaylist = require( '../controllers/page_single_playlist' );
var PageBaseView = require( '../views/page_baseview' );



function getMyPlaylistsData( options )
{
    db.getMyPlaylists( options.user.id, function( dbResponse )
    {
        options.callback( dbResponse.rows.map( function( rowData )
        {
            return {
                id: rowData.id,
                name: rowData.name,
                description: rowData.description,
                visibility: rowData.visibility,
            }
        } ) );

    } );
}

router.get( '/', function( req, res, next )
{
    var session = req.session;
    console.log( 'plalist ROUTE' );
    var pagePlaylistController;
    if ( req.session.user )
    {
        getMyPlaylistsData(
        {
            user: req.session.user,
            callback: function( playlistsData )
            {
                pagePlaylistController = new PagePlaylist(
                {
                    playlistsData: playlistsData,
                    dict: res.dict,
                    session: session
                } );
                console.log( 'Cookies: ', req.cookies );
                pagePlaylistController.render( function( responseView )
                {
                    res.send( responseView );
                } );
            }
        } );
    }
    else
    {
        res.send( new PageBaseView().renderUnauthorized() );
    }

} );

router.get( '/json', function( req, res, next )
{
    var session = req.session;
    if ( req.session && req.session.user )
    {
        getMyPlaylistsData(
        {
            user: req.session.user,
            callback: function( playlistsData )
            {
                res.send( JSON.stringify( playlistsData ) );
            }
        } );
    }
    else
    {
        var pageBaseView = new PageBaseView(
        {
            title: 'Devi essere loggato per accedere alle nostre API',
        } );
        res.send( pageBaseView.renderUnauthorized() );
    }

} );

router.get( '/fortrack/:songid', function( req, res, next )
{
    var session = req.session;
    if ( req.session && req.session.login && req.session.user )
    {
        db.getMyPlaylistsDataForSong(
        {
            userId: req.session.user.id,
            songId: req.params.songid,
            callback: function( playlistsData )
            {
                res.send( JSON.stringify( playlistsData ) );
            }
        } );
    }
    else
    {
        var pageBaseView = new PageBaseView(
        {
            title: 'Devi essere loggato per accedere alle nostre API',
        } );
        res.send( pageBaseView.renderUnauthorized() );
    }

} );

router.get( '/:playlistid/addfortrack/:songid', function( req, res, next )
{
    var session = req.session;
    if ( req.session && req.session.login && req.session.user && req.session.user.id )
    {

        db.addPlaylistForTrack(
        {
            playlistId: req.params.playlistid,
            songId: req.params.songid,
            userId: req.session.user.id
        } );

        res.send(JSON.stringify({status: 'ok'}));
    }
} );

router.get( '/:playlistid/removefortrack/:songid', function( req, res, next ) {
  var session = req.session;
  if ( req.session && req.session.login && req.session.user && req.session.user.id )
  {

      db.removePlaylistForTrack(
      {
          playlistId: req.params.playlistid,
          songId: req.params.songid,
          userId: req.session.user.id
      } );
      res.send(JSON.stringify({status: 'ok'}));
  }
} );

router.get( '/new', function( req, res, next )
{
    console.log( req.params.id );
    var session = req.session;
    console.log( 'Register ROUTE' );
    var pageSinglePlaylistController = new PageSinglePlaylist(
    {
        dict: res.dict,
        session: session
    } );
    //res.render('index', { title: 'Express' });
    //
    console.log( 'Cookies: ', req.cookies );
    //res.send(pagePlaylistController.render());
    pageSinglePlaylistController.render( function( responseView )
    {
        res.send( responseView );
    } )
} );

router.post( '/new', function( req, res, next )
{
    console.log( req.params.id );
    var session = req.session;
    var pageSinglePlaylistController = new PageSinglePlaylist(
    {
        dict: res.dict,
        data: req.body,
        session: session
    } );
    pageSinglePlaylistController.render( function( responseView )
    {
        res.send( responseView );
    } );
} );

router.post( '/edit', function( req, res, next )
{
    var session = req.session;
    /*
    var pageSinglePlaylistController = new PageSinglePlaylist(
    {
        shouldBeEdited: true,
        dict: res.dict,
        data: req.body,
        session: session
    } );
    */


    db.editPlaylist(
    {
        playlistId: req.body.playlist_id,
        name: req.body.name,
        desc: req.body.desc,
        visibility: req.body.visibility
    } );

    /*
    pageSinglePlaylistController.render( function( responseView )
    {
        res.send( responseView );
    } ) */
    res.redirect( `/playlist/${req.body.playlist_id}` );
} );

router.get( '/delete/:playlistId', function( req, res, next )
{
    console.log( "DELETE PLAYLIST WITH ID: " + req.params.playlistId );
    var session = req.session;

    if ( session.login )
    {
        db.deletePlaylist(
        {
            playlistId: req.params.playlistId,
            userId: session.user.id
        } );
        res.redirect( '/playlist' );
    }
    else
    {
        res.redict( '/home' );
    }
} );

router.get( '/:id', function( req, res, next )
{
    var session = req.session;
    var pageSinglePlaylistController = new PageSinglePlaylist(
    {
        dict: res.dict,
        session: session,
        playlistId: req.params.id
    } );
    pageSinglePlaylistController.render( function( responseView )
    {
        res.send( responseView );
    } )
} );

router.get( '/:id/json', function( req, res, next )
{
  var session = req.session;
  if (req.session && req.session.login && req.session.user) {
    db.getMyPlaylistData(
      {
        playlistId: req.params.id,
        userId: req.session.user.id,
        callback: function(dbResponse) {
          res.send(JSON.stringify(dbResponse));
        }
      }
    );
  } else {
    res.send(JSON.stringify({}));
  }
} );


module.exports = router;
