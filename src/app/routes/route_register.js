var express = require( 'express' );
var router = express.Router();


var PageRegister = require( '../controllers/page_register' );
/* GET home page. */
router.get( '/', function( req, res, next )
{
    var session = req.session;
    console.log( 'Register ROUTE GET' );
    var pageRegisterController = new PageRegister(
    {
        dict: res.dict,
        session: session
    } );
    //res.render('index', { title: 'Express' });
    //
    //console.log('Cookies: ', req.cookies);
    //res.send(pageRegisterController.render());
    pageRegisterController.render( function( responseView )
    {
        res.send( responseView );
    } )
} );


router.post( '/', function( req, res, next )
{
  var session = req.session;
    console.log( 'Register ROUTE POST' );
    console.log( req.body );
    var pageRegisterController = new PageRegister(
    {
        dict: res.dict,
        data: req.body,
        session: session
    } );
    //res.render('index', { title: 'Express' });
    //
    //
    pageRegisterController.render( function( responseView )
    {
        res.send( responseView );
    } )
} );

module.exports = router;
