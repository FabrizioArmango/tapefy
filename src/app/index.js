var createError = require( 'http-errors' );
var express = require( 'express' );
var path = require( 'path' );
var cookieParser = require( 'cookie-parser' );
const fs = require( 'fs' );

var session = require( 'express-session' );
var MySQLStore = require( 'express-mysql-session' )( session );

//var logger = require('morgan');

//var indexRouter = require('./routes/route_index');
//var usersRouter = require('./routes/route_users');


var PageNotFound = require('./controllers/page_not_found');
var db = require('./controllers/db');

var ROUTES = {
    '/': require( './routes/route_index' ),
    '/login': require( './routes/route_login' ),
    '/logout': require( './routes/route_logout' ),
    '/register': require( './routes/route_register' ),
    '/playlist': require( './routes/route_playlist' ),
    '/search': require( './routes/route_search' ),
    '/community': require( './routes/route_community' ),
};

var app = express();

var options = {
    host: 'localhost',
    user: 'vagrantdb',
    password: 'vagrantdb',
    host: 3306,
    database: 'tapefy'
};

var sessionStore = new MySQLStore( options );

var expiryDate = new Date(Date.now() + 60 * 60 * 1000) // 1 hours
app.use( session(
{
    name: 'session',
    keys: ['session_cookie_name1', 'session_cookie_name2'],
    secret: 'session_cookie_secret',
    store: sessionStore,
    resave: false,
    saveUninitialized: false,
    cookie:
    {
        //secure: true,
        httpOnly: true,
        expires: expiryDate
    }
} ) );


app.use( '/fonts', express.static( '/var/www/vagrant/www/fonts' ) );
app.use( '/lib', express.static( '/var/www/vagrant/www/lib' ) );
app.use( '/imgs', express.static( '/var/www/vagrant/www/imgs' ) );
app.use( '/tracks', express.static( '/var/www/vagrant/www/tracks' ) );

// app.set('views', path.join(__dirname, 'views'));

app.use( express.json() );

app.use( express.urlencoded(
{
    extended: false
} ) );
console.log( '<< Tapefy >> (cookieParser) enabling...' );
app.use( cookieParser() );

app.use( function( req, res, next )
{
  res.dict = require('./lang/dict').init(req.headers);
  if (req.session && req.session.login && req.session.user && req.session.user.email) {
    db.get({
      querySQL: ['UPDATE users SET ts_keep_alive = CURRENT_TIMESTAMP WHERE email = ?;', [req.session.user.email]]
    })
  }
  console.log( 'Cookies: ', req.cookies );
  next();
} );


Object.keys( ROUTES ).forEach( function( route )
{
    console.log( `<< Tapefy >> (Router) enabling route ${route}` );
    app.use( route, ROUTES[ route ] );
} );


// catch 404 and forward to error handler
app.use( function( req, res, next )
{
    next( createError( 404 ) );
} );

// error handler
app.use( function( err, req, res, next )
{
    console.log( "error handler" );
    console.log( req );
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get( 'env' ) === 'development' ? err :
    {};

    // render the error page
    console.log( res.locals );
    res.status( err.status || 500 );
    //res.render('error');

    var pageNotFoundController = new PageNotFound(
    {
        dict: res.dict,
        session: session
    } );
    //res.render('index', { title: 'Express' });
    //
    console.log( 'Cookies: ', req.cookies );
    //res.send(pagePlaylistController.render());
    pageNotFoundController.render( function( responseView )
    {
        res.send( responseView );
    } );
    //res.send( 'error' );
} );

module.exports = app;