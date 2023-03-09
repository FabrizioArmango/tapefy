var express = require( 'express' );
var router = express.Router();

var PageCommunityController = require( '../controllers/page_community' );
router.get( '/', function( req, res, next )
{
    var session = req.session;
    var pageCommunityController = new PageCommunityController(
    {
        session: session
    } );

    pageCommunityController.render( function( responseView )
    {
        res.send( responseView );
    } );
} );

router.get( '/friends/add/:id', function( req, res, next )
{
    var session = req.session;
    if ( session.login && session.user && session.user.id )
        db.addFriend( session.user.id, req.params.id, function()
        {
            res.send( JSON.stringify( "{}" ) );
        } );
    else res.send( JSON.stringify( "{}" ) );
} );


router.get( '/friends/remove', function( req, res, next )
{
    var session = req.session;
    if ( session.login && session.user && session.user.id )
        db.removeFriend( session.user.id, function()
        {
            res.send( JSON.stringify( "{}" ) );
        } );
    else res.send( JSON.stringify( "{}" ) );
} );

module.exports = router;
