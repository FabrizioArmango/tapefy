function get( url, callback, options )
{
    var opt = Object.assign(
    {
        json: true
    }, options );
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function()
    {
        if ( xmlHttp.readyState == 4 && xmlHttp.status == 200 )
        {
            if ( callback )
            {
                if ( opt.json )
                {
                    callback( JSON.parse( xmlHttp.responseText ) );
                }
                else
                {
                    callback( xmlHttp.responseText );
                }
            }
        }
    }
    xmlHttp.open( "GET", url, true );
    xmlHttp.send( null );
}

var keepAliveInterval;
keepAliveInterval = setInterval( function()
{
    if ( true )
    {
        console.log( "keep alive" );
        get( '/login/keepalive' );
    }
}, 10000 )
