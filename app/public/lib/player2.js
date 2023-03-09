var shrinkedPlayerString = `
   <div id="tp-player-inner" class="row no-gutters w-75 h-100 d-inline-flex">
     <audio id="audio-player"></audio>
     <div class="col h-100 d-flex">

       <div id="current-album-figure" class="row no-gutters h-100 justify-content-center align-items-center w-25 d-inline-flex">
         <img class="h-75" src="/imgs/qvc8.jpg">
       </div>

       <div class="row no-gutters h-100 justify-content-start align-items-center w-75 d-inline-flex">
         <div class="">
           <div class="song-artist row no-gutters justify-content-left align-items-center py-1 px-2">
             <i class="fa fa-user fa-lg mr-4" style="display: none;"></i>artist
           </div>
           <div class="song-album row no-gutters justify-content-left align-items-center py-1 px-2" style="display: none;">
             <i class="fa fa-music fa-lg mr-4"></i>albumName
           </div>
           <div class="song-title row no-gutters justify-content-left align-items-center py-1 px-2">
             <i class="fa fa-headphones fa-lg mr-4" style="display: none;"></i>title
           </div>
         </div>
       </div>
     </div>
   </div>
   <div class="row w-25 h-100 d-inline-flex align-items-center">

     <div class="col">
       <div class="row h-25 justify-content-center hidden" style="display: none;">

         <div class="col col-sm col-md-2 col-lg-3 col-xl-2 ml-md-auto align-self-center text-center" style="white-space:nowrap;">
            <span id="play-current-time" class="play-current-time">00:00</span> / <span id="play-duration-time" class="play-total-time">00:00</span>
         </div>

         <div class="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-10 align-self-center">
           <div id="progressbar" class="progress row mr-md-4">
             <div id="progressbar-inner" class="bar"></div>
           </div>
         </div>

       </div>

       <div class="action-button row align-items-center h-75">
         <a href="javascript:void(0)" class="controls prev col text-center" style="display: none;">
           <i class="fa fa-step-backward fa-lg"></i>
         </a>
         <a id="play-pause-button" href="javascript:void(0)" class="controls play-pause active col text-center">
           <i class="fa fa-play fa-lg"></i>
         </a>
         <a href="javascript:void(0)" class="controls next col text-center" style="display: none;">
           <i class="fa fa-step-forward fa-lg"></i>
         </a>
       </div>


     </div>


   </div>`;
/*
var tpInner = document.createElement( 'div' );
tpInner.innerHTML = shrinkedPlayerString;

var largePlayerString = '';


var shrinked = false;

var startY = 0,
    currentY;

var preventPullToRefresh = false;
var lastTouchY = 0;
*/


/*
var togglePlaylist = document.getElementById( 'toggle-play-list' );
console.log( togglePlaylist );
togglePlaylist.style.zIndex = '99999';
togglePlaylist.addEventListener( 'click', function()
{
    console.log( "click" );

    var children = document.querySelectorAll( '.list-group-item.list-group-item-action' );
    for ( var i = 0; i < children.length; i++ )
    {
        children[ i ].addEventListener( 'touchstart', function( e )
        {
            if ( document.getElementById( 'playlist-container' ).scrollTop > 0 )
                e.stopPropagation();
        } );
        children[ i ].addEventListener( 'mousedown', function( e )
        {
            if ( document.getElementById( 'playlist-container' ).scrollTop > 0 )
                e.stopPropagation();
        } );
    }
} );
*/



var ComponentPlayer = ( function()
{
    var
        PLAYER_ID = 'tp-player',
        PLAYER_INNER_ID = 'tp-player-inner',
        BUTTON_TOGGLE_PLAYLIST_ID = 'toggle-play-list';

    var rendered = false;




    var setupListeners;






    var data = ( function()
    {
        var _playerShrinked = false;

        var _playerY;
        var _playerStartY = 0;

        var _playlistOpen = true;

        return {
            playlist: [
            {
                title: 'Toradol',
                artworkSrc: '',
                artist: 'Gemitaiz',
                album: 'QVC8',
                duration: '4:20',
                progress: 0,
            }, ],
            trackIdx: 0,
            get playerY()
            {
                return _playerY;
            },
            set playerY( v )
            {
                _playerY = v;
            },
            get playerStartY()
            {
                return _playerStartY;
            },
            set playerStartY( v )
            {
                _playerStartY = v;
            },
            get isPlayerShrinked()
            {
                return _playerShrinked;
            },
            set isPlayerShrinked( v )
            {
                _playerShrinked = v;
            },
            get isPlaylistOpen()
            {
                //readCookie
                return _playlistOpen;
            },
            set isPlaylistOpen( v )
            {
                _playlistOpen = v;
                // write cookie
            },
        }
    } )();

    var view = {
        playerElement: undefined,
        playerInnerElement: undefined,
        togglePlaylistButtonElement: undefined,
        renderPlaylistItem: function( itemData )
        {
            return `
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${itemData.title}</h5>
            <small class="text-muted">${itemData.duration}</small>
          </div>
          <p class="mb-1">${itemData.artist}</p>
          <small class="text-muted">${itemData.album}</small>
        </a>
        `;
        },
        renderPlaylist: function()
        {
            var playlistName = 'Mix';
            return `
        <div id="playlist-container" class="container h-100 p-1 p-sm-2 p-lg-5 p-xl-5">
          <div id="playlist-header" class="">
            <h4>${playlistName}</h4>
          </div>
          <div id="playlist-body" class="list-group">
          ${data.playlist.map(function(itemData) {
            return view.renderPlaylistItem(itemData);
          }).join("")}
          </div>
        </div>`;
        },
        render: function()
        {
          console.log(data.isPlayerShrinked);
            if ( rendered )
            {
                if ( data.isPlaylistOpen )
                {

                    console.log( "render.rendered.isPlaylistOpen" );
                    //largePlayerString = view.playerElement.innerHTML;
                    this.playerInnerElement.innerHTML = view.renderPlaylist();
                    var children = view.playerInnerElement.querySelectorAll( '.list-group-item.list-group-item-action' );
                    for ( var i = 0; i < children.length; i++ )
                    {
                        children[ i ].addEventListener( 'touchstart', function( e )
                        {
                            if ( document.getElementById( 'playlist-container' ).scrollTop > 0 )
                                e.stopPropagation();
                        } );
                        children[ i ].addEventListener( 'mousedown', function( e )
                        {
                            if ( document.getElementById( 'playlist-container' ).scrollTop > 0 )
                                e.stopPropagation();
                        } );

                    }
                }
                else
                {
                    console.log( "render.rendered.!isPlaylistOpen" );
                    console.log( "Rendering player.." )

                    //this.playerInnerElement.innerHTML = view.renderDefault();
                    console.log( "render.rendered" );
                    view.playerElement.innerHTML = largePlayerString;
                    view.playerElement.className = "container-fluid";
                    //player.style.top = "0";
                    view.playerElement.style.top = '0px'

                }

            }
            else
            {
                if ( data.isPlaylistOpen )
                {
                    console.log( "render.!rendered.isPlaylistOpen" );
                    largePlayerString = view.playerElement.innerHTML;
                    this.playerInnerElement.innerHTML = view.renderPlaylist();
                    var children = view.playerInnerElement.querySelectorAll( '.list-group-item.list-group-item-action' );
                    for ( var i = 0; i < children.length; i++ )
                    {
                        children[ i ].addEventListener( 'touchstart', function( e )
                        {
                            if ( document.getElementById( 'playlist-container' ).scrollTop > 0 )
                                e.stopPropagation();
                        } );
                        children[ i ].addEventListener( 'mousedown', function( e )
                        {
                            if ( document.getElementById( 'playlist-container' ).scrollTop > 0 )
                                e.stopPropagation();
                        } );
                    }
                }
                else
                {
                    console.log( "render.!rendered.!isPlaylistOpen" );
                    console.log( "Rendering player.." )
                    largePlayerString = view.playerElement.innerHTML;
                    //this.playerInnerElement.innerHTML = view.renderDefault();


                }
            }


            rendered = true;
        },
        update: function()
        {
            if ( !rendered )
            {
                this.playerElement = document.getElementById( PLAYER_ID );
                this.playerInnerElement = this.playerElement.querySelector( '#' + PLAYER_INNER_ID );
                this.togglePlaylistButtonElement = document.getElementById( BUTTON_TOGGLE_PLAYLIST_ID );
                this.render();
            }
            else
            {
                this.render();
                this.playerElement = document.getElementById( PLAYER_ID );
                this.playerInnerElement = this.playerElement.querySelector( '#' + PLAYER_INNER_ID );
                this.togglePlaylistButtonElement = document.getElementById( BUTTON_TOGGLE_PLAYLIST_ID );
            }
        }
    };

    var togglePlaylist = function( e )
    {
        console.log( "!!! togglePlaylist" )

        console.log( "data.isPlaylistOpen: " + data.isPlaylistOpen );
        data.isPlaylistOpen = !data.isPlaylistOpen;
        console.log( "data.isPlaylistOpen: " + data.isPlaylistOpen );
        view.update();
        setupListeners();
    };


    var shrinkPlayer = function()
    {
        largePlayerString = view.playerElement.innerHTML;
        console.log( largePlayerString );
        view.playerElement.removeEventListener( 'mouseup', onMouseUp );
        view.playerElement.removeEventListener( 'touchend', onMouseUp );
        window.removeEventListener( 'mousemove', onMouseMove );
        window.removeEventListener( 'touchmove', onMouseMove );
        view.playerElement.onmouseup = null;
        view.playerElement.className += ' hiding';

        setTimeout( () =>
        {

            view.playerElement.innerHTML = shrinkedPlayerString;
            view.playerElement.className = "container-fluid d-flex shrinked";
            view.playerElement.style.top = "";
            data.playerY = data.playerStartY;
        }, 400 );

        document.cookie = "player=shrink";
        data.isPlayerShrinked = true;
    }


    var refreshPlayerPosition = function()
    {
        var newY = data.playerY - data.playerStartY;

        if ( newY >= 0 )
            view.playerElement.style.top = newY + 'px';
    }

    var onMouseMove = function( event )
    {
        event.stopPropagation();
        event.preventDefault();

        console.log( "onMouseMove" );
        var currentX;
        if ( event.pageY )
        {
            //currentX = event.pageX;
            data.playerY = event.pageY;
        }
        else
        {
            //currentX = event.touches[ 0 ].pageX;
            data.playerY = event.touches[ 0 ].pageY;
        }
        console.log( event );
        console.log( "currentY: " + data.playerY );
        if ( data.playerY - data.playerStartY > window.innerHeight - 200 )
        {
            //player.removeEventListener( 'mousedown', onMouseDown );
            //player.removeEventListener( 'touchstart', onMouseDown );
            shrinkPlayer();

        }
        else
        {
            refreshPlayerPosition();
        }
    }

    var onMouseUp = function()
    {
        console.log( "onMouseUp" );

        window.removeEventListener( 'mousemove', onMouseMove );
        window.removeEventListener( 'touchmove', onMouseMove );
        view.playerElement.onmouseup = null;


        if ( data.playerY - data.playerStartY > 200 )
        {
            shrinkPlayer();
        }
        else
        {
            data.playerY = data.playerStartY;
            refreshPlayerPosition();
        }
    }

    var onMouseDown = function( event )
    { // (1) start the process
        if ( !data.isPlayerShrinked )
        {
            console.log( "onMouseDown" );
            var currentX;
            if ( event.pageY )
            {
                //currentX = event.pageX;

                //startY = event.pageY;
                data.playerStartY = event.pageY;
            }
            else
            {
                //currentX = event.touches[ 0 ].pageX;
                data.playerStartY = event.touches[ 0 ].pageY;
                //startY = event.touches[ 0 ].pageY;
            }
            refreshPlayerPosition();

            window.addEventListener( 'mousemove', onMouseMove );
            window.addEventListener( 'touchmove', onMouseMove,
            {
                passive: false
            } );

            view.playerElement.addEventListener( 'mouseup', onMouseUp );
            view.playerElement.addEventListener( 'touchend', onMouseUp );

            view.playerElement.addEventListener( 'dragstart', function()
            {
                console.log( "dragstart" );
                return false;
            } );

            return false;
        }
        else
        {
            console.log( "restore player" )
            //data.isPlayerShrinked = false;
            view.update();
            setupListeners();
        }
    };


    // listeners
    var setupScrollingViewToBottomListeners = function()
    {
        view.playerElement.addEventListener( 'mousedown', onMouseDown );
        view.playerElement.addEventListener( 'touchstart', onMouseDown );

    };


    setupListeners = function()
    {
        console.log( "setup listeners" )
        setupScrollingViewToBottomListeners();

        view.togglePlaylistButtonElement.addEventListener( 'mousedown', function( e )
        {
            e.stopPropagation();
        } );
        view.togglePlaylistButtonElement.addEventListener( 'click', togglePlaylist );
    };

    view.update();
    setupListeners();



} )();
