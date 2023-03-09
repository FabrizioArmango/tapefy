var express = require( 'express' );
var router = express.Router();
var db = require( '../controllers/db' );

var PageLogin = require( '../controllers/page_login' );
/* GET home page. */
router.get( '/', function( req, res, next )
{
    var session = req.session;
    console.log( 'LOGIN ROUTE GET' );
    console.log( res.dict );
    var pageLoginController = new PageLogin(
    {
        dict: res.dict,
        session: session,
    } );
    //res.render('index', { title: 'Express' });
    //
    pageLoginController.render( function( responseView )
    {
        res.send( responseView );
    } )
} );

router.get( '/keepalive', function( req, res, next )
{
    var session = req.session;
    console.log( 'KEEP ALIVE GET' );

    if ( req.session.login && req.session.user )
    {
        db.keepAlive( req.session.user.id, function() {} );
    }

    res.send( JSON.stringify(
    {
        status: 'ok'
    } ) );


} );


router.post( '/', function( req, res, next )
{
    var session = req.session;
    console.log( 'LOGIN ROUTE POST' );
    console.log( req.body );
    var pageLoginController = new PageLogin(
    {
        dict: res.dict,
        data: req.body,
        session: session,
    } );
    //res.render('index', { title: 'Express' });
    //
    //
    console.log( 'Cookies: ', req.cookies );
    pageLoginController.render( function( responseView )
    {
        res.send( responseView );
    } );
} );

module.exports = router;
