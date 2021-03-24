var express = require( 'express' );
var router = express.Router();

router.get( '/', function( req, res, next )
{
    var session = req.session;

    session.destroy( function( err )
    {
        //cal back method
        res.redirect( '/home' );
    } )


} );

module.exports = router;
