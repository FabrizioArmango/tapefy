var mysql = require( 'mysql2' );
var bcrypt = require( 'bcryptjs' );



var
    ERROR_USER_NOT_EXISTS = 0,
    ERROR_WRONG_PASSWORD = 1,
    RESULT_WAS_FOUND = 2,
    ERROR_PLAYLIST_NOT_EXISTS = 3,
    ERROR_NO_ONLINE_USERS = 4,
    NO_ROWS_FOUND = 5;

var db = ( function()
{
    return {
        getSearchQueryResults: getSearchQueryResults,
        get: _get,
        existsEmail: existsEmail,
        createUser: createUser,
        userLogin: userLogin,
        getPlaylist: getPlaylist,
        getMyPlaylists: getMyPlaylists,
        getOnlineUsers: getOnlineUsers,
        createPlaylist: createPlaylist,
        editPlaylist: editPlaylist,
        deletePlaylist: deletePlaylist,
        getMyPlaylistsDataForSong: getMyPlaylistsDataForSong,
        addPlaylistForTrack: addPlaylistForTrack,
        removePlaylistForTrack: removePlaylistForTrack,
        keepAlive: keepAlive,
        getMyPlaylistData: getMyPlaylistData,
        addFriend: addFriend,
        removeFriend: removeFriend,

        ERROR_USER_NOT_EXISTS: ERROR_USER_NOT_EXISTS,
        ERROR_WRONG_PASSWORD: ERROR_WRONG_PASSWORD,
        ERROR_PLAYLIST_NOT_EXISTS: ERROR_PLAYLIST_NOT_EXISTS,
        RESULT_WAS_FOUND: RESULT_WAS_FOUND,
        ERROR_NO_ONLINE_USERS: ERROR_NO_ONLINE_USERS,
        NO_ROWS_FOUND: NO_ROWS_FOUND
    }
} )();

module.exports = db;


var connection = mysql.createConnection(
{
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE
} );


connection.connect();

function connect()
{
    connection.connect();
}

function _autoGet( options )
{

    _get( options );
    //connection.end();
}

function _get( options )
{
    connection.query( options.querySQL[ 0 ], options.querySQL[ 1 ], function( err, rows, fields )
    {
        if ( err )
        {
            throw err;
            if ( options.onSQLError )
            {
                options.onSQLError( err );
            }
        }
        else
        {
            if ( options.onSQLData )
            {
                options.onSQLData( rows );
            }
        }
        //console.log( 'The solution is: ', rows[ 0 ] );
    } );
}



function getSearchQueryResults( options )
{
    console.log( "db.getSearchQueryResults" );
    // do query
    /*

    SELECT *
    FROM `tapefy`.`songs`
    WHERE (CONVERT(`name` USING utf8) LIKE '%Gia%')
    OR (CONVERT(`name` USING utf8) LIKE '%da%')
    OR (CONVERT(`name` USING utf8) LIKE '%un%')
    OR (CONVERT(`name` USING utf8) LIKE '%po%')
    OR (`artist_id` = (
        SELECT `artist_id`
        FROM `tapefy`.`artists`
        WHERE (CONVERT(`name` USING utf8) LIKE '%Gemitaiz%')
      )
    )

*/
    console.log( options );
    var words = options.query.replace( /'/g, "\\'" ).split( " " );
    /*
    var querySQL = 'SELECT * ';
    querySQL += 'FROM `tapefy`.`songs` ';
    querySQL += 'WHERE (CONVERT(`name` USING utf8) = \'' + words[ 0 ] + '\') ';
    for ( var i = 1; i < words.length; i++ )
    {
        querySQL += 'OR (CONVERT(`name` USING utf8) = \'' + words[ 0 ] + '\') ';
    }
    querySQL += 'OR (`artist_id` = (';
    querySQL += 'SELECT `artist_id` ';
    querySQL += 'FROM `tapefy`.`artists` ';
    querySQL += 'WHERE (CONVERT(`name` USING utf8) = \'' + words[ 0 ] + '\') ';
    for ( var i = 1; i < words.length; i++ )
    {
        querySQL += 'OR (CONVERT(`name` USING utf8) = \'' + words[ 0 ] + '\') ';
    }
    querySQL += ')';
    querySQL += ')';
    console.log( querySQL );
*/
    var querySQL = 'SELECT ';
    querySQL += 'songs.name as song_name, ';
    querySQL += 'songs.song_id, ';
    querySQL += 'songs.duration as song_duration, ';
    querySQL += 'songs.album_track_idx as track_idx, ';
    querySQL += 'songs.uri as uri, ';
    querySQL += 'songs.genre_id as song_genre, ';
    querySQL += 'albums.name as album_name, ';
    querySQL += 'artists.name as artist_name, ';
    querySQL += 'albums.artwork_uri as album_artwork ';

    querySQL += 'FROM `songs`, `artists`, `albums` ';

    querySQL += 'WHERE songs.artist_id = artists.artist_id ';
    querySQL += 'AND songs.album_id = albums.album_id ';
    querySQL += "AND (songs.name SOUNDS LIKE ? ";
    querySQL += "OR artists.name SOUNDS LIKE ? ";
    querySQL += "OR albums.name SOUNDS LIKE ?);";
    _autoGet(
    {
        querySQL: [ querySQL, [ options.query, options.query, options.query ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
        onSQLData: function( rows )
        {
            console.log( rows );

            options.onData( rows.map( function( rowData, idx )
            {
                var minutes = Math.floor( rowData.song_duration / 60 );
                var seconds = rowData.song_duration - minutes * 60;

                return {
                    id: rowData.song_id,
                    idx: idx,
                    type: 'song',
                    duration: minutes + ':' + parseInt( seconds ),
                    name: rowData.song_name.replace( /\\'/g, "'" ),
                    artist: rowData.artist_name.replace( /\\'/g, "'" ),
                    album: rowData.album_name.replace( /\\'/g, "'" ),
                    genre: rowData.song_genre.replace( /\\'/g, "'" ),
                    uri: encodeURI( rowData.uri.replace( /\\'/g, "'" ) ),
                    artwork: rowData.album_artwork
                };
            } ) );
        },
        onSQLError: function( err )
        {
            options.onError( err );
        }
    } );
    /*
    connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields) {
      if (err) throw err;
      console.log('The solution is: ', rows[0].solution);
    });
     */
}

function existsEmail( email, callback )
{
    console.log( "Calling existsEmail" );
    var querySQLCheckEmail = "SELECT * FROM `tapefy`.`users` WHERE `email` = ?";
    console.log( querySQLCheckEmail );

    db.get(
    {
        querySQL: [ querySQLCheckEmail, [ email ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
        onSQLData: function( rows )
        {
            if ( rows.length > 0 )
            {
                callback( true );
            }
            else
            {
                callback( false );
            }
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}

function createUser( data, onUserCreated )
{
    var saltRounds = 10;
    bcrypt.hash( data.password, saltRounds, function( err, hashPassword )
    {
        console.log( "hashPassword:" + hashPassword );

        var sql = "INSERT INTO `tapefy`.`users` (`email`, `first_name`, `last_name`, `password`, `birth_date`) VALUES (?, ?, ?, ?, ?)";

        db.get(
        {
            querySQL: [ sql, [ data.email, data.first_name, data.last_name, hashPassword, data.birth_date ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
            onSQLData: function( rows )
            {
                console.log( rows )
            },
            onSQLError: function( err )
            {
                console.log( err );
                //options.onError( err );
            }
        } );
    } );
}


//
//
// // //
// // // //
// // //
// AUTHENTICATION
// // //
// // // //
// // //
//


function userLogin( data, callback )
{
    var saltRounds = 10;
    var sql = "SELECT `user_id`, `password`, `first_name`, `last_name` FROM `tapefy`.`users` WHERE email = ?";
    console.log( sql );
    db.get(
    {
        querySQL: [ sql, [ data.email ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
        onSQLData: function( userRows )
        {
            if ( userRows.length > 0 )
            {

                bcrypt.compare( data.password, userRows[ 0 ].password, function( err, res )
                {
                    console.log( 'res:' + res )
                    if ( res )
                    {
                        callback(
                        {
                            status: 'RESULT_WAS_FOUND',
                            statusCode: RESULT_WAS_FOUND,
                            rows: userRows
                        } );
                    }
                    else
                    {
                        callback(
                        {
                            status: 'ERROR_WRONG_PASSWORD',
                            statusCode: ERROR_WRONG_PASSWORD,
                            rows: userRows
                        } );
                    }

                } );
            }
            else
            {
                callback(
                {
                    status: 'ERROR_USER_NOT_EXISTS',
                    statusCode: ERROR_USER_NOT_EXISTS,
                    rows: userRows
                } );
            }
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}
//function is
// move this function to utils
function isOnline( ts_keep_alive )
{
    var elapsedMs = Date.parse( new Date() ) - Date.parse( ts_keep_alive );
    return elapsedMs < 10000;
}

function getOnlineUsers( userId, callback )
{
    var timeout = ( Date.parse( new Date().toUTCString() ) - 15000 );
    var currentDate = new Date( timeout );
    var year = currentDate.getFullYear(),
        month = currentDate.getMonth() + 1,
        day = currentDate.getDate(),
        hours = currentDate.getHours(),
        minutes = currentDate.getMinutes(),
        seconds = currentDate.getSeconds();

    currentDate =
        year + '-' +
        ( ( month < 10 ? '0' : '' ) + month ) + '-' +
        ( ( day < 10 ? '0' : '' ) + day ) + ' ' +
        ( ( hours < 10 ? '0' : '' ) + hours ) + ':' +
        ( ( minutes < 10 ? '0' : '' ) + minutes ) + ':' +
        ( ( seconds < 10 ? '0' : '' ) + seconds );

    var sql = `
    SELECT
      users.user_id,
      users.first_name,
      users.last_name,
      users.listens,
      user_friendship.to_user_id

    FROM users
	     LEFT JOIN user_friendship
	      ON (user_friendship.to_user_id = users.user_id)

    WHERE users.ts_keep_alive > ?
      AND (
		    (
            user_friendship.from_user_id = ?
		        AND
            user_friendship.to_user_id = users.user_id
        )
		    OR user_friendship.to_user_id IS NULL
      );
  `;
    db.get(
    {
        querySQL: [ sql, [ currentDate, userId ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
        onSQLData: function( userRows )
        {
            console.log( userRows )
            if ( userRows.length > 0 )
            {
                callback(
                {
                    status: 'RESULT_WAS_FOUND',
                    statusCode: RESULT_WAS_FOUND,
                    rows: userRows.map( function( userData )
                    {
                        userData.isFriend = userData.to_user_id !== null;
                        return userData;
                    } )
                } );
            }
            else
            {
                callback(
                {
                    status: 'ERROR_NO_ONLINE_USERS',
                    statusCode: ERROR_NO_ONLINE_USERS,
                    rows: userRows
                } );
            }
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}

function getPlaylist( playlistId, callback )
{
    var sql = "SELECT * FROM `tapefy`.`playlists` WHERE `playlist_id` = ?;";

    db.get(
    {
        querySQL: [ sql, [ playlistId ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
        onSQLData: function( playlistRows )
        {
            if ( playlistRows.length > 0 )
            {
                var trackSQL = `
                SELECT
                  songs.song_id as song_id,
                  songs.name as name,
                  songs.duration as duration,
                  artists.name as artist_name,
                  albums.name as album_name
                FROM
                  playlist_songs,
                  songs,
                  albums,
                  artists,
                  playlists
                WHERE
                    playlist_songs.song_id = songs.song_id
                  AND
                    playlists.playlist_id = ?
                  AND
                    albums.album_id = songs.album_id
                  AND
                    songs.artist_id = artists.artist_id
                `;
                db.get(
                {
                    querySQL: [ trackSQL, [ playlistId ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
                    onSQLData: function( trackRows )
                    {
                        console.log( "trackRows: " );
                        console.log( trackRows );
                        playlistRows[ 0 ].tracks = trackRows.map( function( trackData )
                        {
                            return {
                                id: trackData.song_id,
                                title: trackData.name,
                                duration: trackData.duration,
                                artist: trackData.artist_name,
                                album: trackData.album_name
                            };
                        } );
                        callback(
                        {
                            status: 'RESULT_WAS_FOUND',
                            statusCode: RESULT_WAS_FOUND,
                            rows: playlistRows
                        } );
                    },
                    onSQLError: function( err )
                    {
                        console.log( err );
                    }
                } );
            }
            else
            {
                callback(
                {
                    status: 'ERROR_PLAYLIST_NOT_EXISTS',
                    statusCode: ERROR_PLAYLIST_NOT_EXISTS,
                    rows: playlistRows
                } )
            }

            console.log( playlistRows )
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}

function getMyPlaylists( userId, callback )
{
    var sql = "SELECT playlist_id as id, name, description, visibility FROM `tapefy`.`playlists` WHERE `created_by` = ?;";

    db.get(
    {
        querySQL: [ sql, [ userId ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
        onSQLData: function( rows )
        {
            var foundRows = rows.length > 0;
            callback(
            {
                status: foundRows ? 'RESULT_WAS_FOUND' : 'NO_ROWS_FOUND',
                statusCode: foundRows ? RESULT_WAS_FOUND : NO_ROWS_FOUND,
                rows: rows
            } );
            console.log( rows )
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}

function createPlaylist( options )
{

    var sql = 'INSERT INTO `playlists` (`name`, `description`, `created_by`, `visibility`) VALUES (?, ?, ?, ?);'
    db.get(
    {
        querySQL: [ sql, [ options.name, options.desc, options.userId, options.visibility ] ], //'SELECT 1 + 1 AS solution', //'SELECT * FROM TABLE WHERE name OR qualcosa = ' + options.query,
        onSQLData: function( rows )
        {
            console.log( rows );
            if ( rows.length > 0 )
            {
                console.log( "added" );
                /*
                  callback(
                  {
                      status: 'RESULT_WAS_FOUND',
                      statusCode: RESULT_WAS_FOUND,
                      rows: rows
                  } ); */
            }
            else
            {
                // some error
            }

            console.log( rows )
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}

function editPlaylist( options )
{
    var sql = 'UPDATE `playlists` SET `name` = ?, `description` = ?, `visibility` = ? WHERE `playlists`.`playlist_id` = ?;';

    db.get(
    {
        querySQL: [ sql, [ options.name, options.desc, options.visibility, options.playlistId ] ],
        onSQLData: function( rows )
        {
            console.log( rows );
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}

function deletePlaylist( options )
{
    var sql = 'DELETE FROM `playlists` WHERE playlist_id = ? AND created_by  = ?;';
    console.log( sql );
    db.get(
    {
        querySQL: [ sql, [ options.playlistId, options.userId ] ],
        onSQLData: function( rows )
        {
            console.log( rows );
        },
        onSQLError: function( err )
        {
            console.log( err );
            //options.onError( err );
        }
    } );
}

function getMyPlaylistsDataForSong( options )
{
    db.get(
    {
        querySQL: [ `SELECT
      playlist_songs.playlist_id
      FROM playlist_songs, playlists

      WHERE playlist_songs.song_id = ?
        AND playlists.created_by = ?
        AND playlists.playlist_id = playlist_songs.playlist_id
      `, [
            options.songId, options.userId
        ] ],
        onSQLData: function( playlistRows )
        {
            var playlistIds = playlistRows.map( function( d )
            {
                return d.playlist_id;
            } );

            getMyPlaylists( options.userId, function( dbResponse2 )
            {
                var response = dbResponse2.rows.map( function( playlistData )
                {
                    playlistData.linked = playlistIds.indexOf( playlistData.id ) !== -1;
                    return playlistData;
                } );

                options.callback( response );
            } );
        }
    } );
}

function addPlaylistForTrack( options )
{
    db.get(
    {
        querySQL: [ `
          INSERT INTO playlist_songs (song_id, playlist_id)
          SELECT tmp.song_id, tmp.playlist_id FROM (SELECT ? as song_id, ? as playlist_id) AS tmp,
          playlists

          WHERE NOT EXISTS (
              SELECT  id, song_id, playlist_id
              FROM playlist_songs
              WHERE song_id = ?
              AND playlist_id = ?
          )
          AND playlists.created_by = ?
          LIMIT 1;
          `,
            [ options.songId, options.playlistId, options.songId, options.playlistId, options.userId ]
        ]
    } );
    // options.userId,
}

function removePlaylistForTrack( options )
{
    db.get(
    {
        querySQL: [ 'DELETE `playlist_songs` FROM `playlist_songs`, `playlists` WHERE `playlist_songs`.`playlist_id` = ? AND `playlist_songs`.`song_id` = ? AND `created_by` = ? AND `playlist_songs`.playlist_id = `playlists`.playlist_id;',
            [ options.playlistId, options.songId, options.userId ]
        ]
    } );
    // options.userId,
}


function keepAlive( userId, callback )
{
    db.get(
    {
        querySQL: [ 'UPDATE users SET ts_keep_alive = CURRENT_TIMESTAMP WHERE `user_id` = ?', [ userId ] ]
    } );
}

function fixString( str )
{
    return str
        .replace( '&agrave;', 'à' )
        .replace( '&egrave;', 'è' )
        .replace( /\\'/g, "'" )
}

function getMyPlaylistData( options )
{
    db.get(
    {
        querySQL: [ "SELECT * FROM playlists WHERE `playlist_id` = ? AND created_by = ?;", [ options.playlistId, options.userId ] ],
        onSQLData: function( dbResponse )
        {
            dbResponse = dbResponse[ 0 ];
            db.get(
            {
                querySQL: [ 'SELECT artists.name as artist_name, songs.name as title, songs.song_id as song_id, albums.name as album, uri, duration, artwork_uri, songs.genre_id as genre FROM playlist_songs, songs, artists, albums WHERE playlist_songs.playlist_id = ? AND playlist_songs.song_id = songs.song_id AND albums.album_id  = songs.album_id AND artists.artist_id = songs.artist_id', [
                    options.playlistId,
                ] ],
                onSQLData: function( dbResponse2 )
                {
                    console.log( dbResponse );
                    var playlistData = {
                        id: dbResponse.playlist_id,
                        name: fixString( dbResponse.name ),
                        description: fixString( dbResponse.description )
                    };

                    playlistData.tracks = dbResponse2.map( function( trackData )
                    {
                        return {
                            title: fixString( trackData.title ),
                            artist_name: fixString( trackData.artist_name ),
                            id: trackData.song_id,
                            album: fixString( trackData.album ),
                            uri: fixString( trackData.uri ),
                            duration: trackData.duration,
                            artwork_uri: fixString( trackData.artwork_uri ),
                            genre: fixString( trackData.genre )
                        }
                    } );
                    options.callback( playlistData );
                }
            } )
        }
    } );
}



function addFriend( me, to )
{
  var sql = "INSERT INTO user_friendship ";
}
function removeFriend( options )
{
  var sql = "DELETE FROM user_friendship"
}
