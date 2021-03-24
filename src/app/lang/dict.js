var AVAILABLE_LANGS = [ 'it' ];

var defaultLang = 'it';
/*
Syntax
Accept-Language: <language>
Accept-Language: *

// Multiple types, weighted with the quality value syntax:
Accept-Language: fr-CH, fr;q=0.9, en;q=0.8, de;q=0.7, *;q=0.5
https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Accept-Language
*/


function getBrowserAcceptedLanguage(headers)
{
  var lang;
    if ( headers && headers[ "accept-language" ] )
    {
        lang = headers[ "accept-language" ].split( ',' )[ 0 ].split( '-' )[ 0 ];
    }

    if ( AVAILABLE_LANGS.indexOf( lang ) === -1 )
    {
        lang = defaultLang;
    }

    return lang;
}


function getData(headers) {
  return require('./lang.' + getBrowserAcceptedLanguage(headers));
}


module.exports  = {
  init: getData
};
