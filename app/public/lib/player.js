var ComponentPlayer = ( function()
{
    var
        PLAYER_CONTROLLER_ID = 'tp-player-controller',
        PLAYER_INNER_ID = 'tp-player-inner',
        BUTTON_TOGGLE_PLAYLIST_ID = 'playlist-toggle',
        PLAY_STOP_BUTTON_ID = 'play-pause-button',
        PREV_BUTTON_ID = 'prev-button',
        NEXT_BUTTON_ID = 'next-button',
        PLAYER_AUDIO_ID = 'audio-player',
        PLAYER_CURRENT_TIME_ID = 'play-current-time',
        PLAYER_DURATION_TIME_ID = 'play-duration-time',
        PROGRESS_BAR_ID = 'progressbar',
        PROGRESS_BAR_INNER_ID = 'progressbar-inner';

    var VIDEO_STATE_HAVE_ENOUGH_DATA = 4;
    var rendered = false;




    var setupListeners;




    var _formatTime = function( seconds )
    {
        var seconds = parseInt( seconds || 0 );
        var minutes = 0;
        while ( seconds >= 60 )
        {
            minutes++;
            seconds -= 60;
            //console.log( seconds );
        }
        if ( seconds < 10 )
        {
            seconds = "0" + seconds;
        }

        if ( minutes < 10 )
        {
            minutes = "0" + minutes;
        }
        //console.log( minutes + ":" + seconds );
        return minutes + ":" + seconds;
    };

    var _getCookie = function( cname )
    {
        var name = cname + "=";
        var decodedCookie = decodeURIComponent( document.cookie );
        var ca = decodedCookie.split( ';' );
        for ( var i = 0; i < ca.length; i++ )
        {
            var c = ca[ i ];
            while ( c.charAt( 0 ) == ' ' )
            {
                c = c.substring( 1 );
            }
            if ( c.indexOf( name ) == 0 )
            {
                return c.substring( name.length, c.length );
            }
        }
        return "";
    }

    var data = ( function()
    {
        document.cookie = "playershrinked=" + false;
        var _playerShrinked =  _getCookie('playershrinked') === "" ? false : _getCookie('playershrinked');

        var _playerY;
        var _playerStartY = 0;

        document.cookie = "playlistopen=false";
        var _playlistOpen = _getCookie('playlistopen')=== "" ? false : _getCookie('playlistopen');

        document.cookie = "isplaying=" + false;
        var _isPlaying = _getCookie('isplaying') === "" ? false : _getCookie('isplaying');

        var _currentTime = _getCookie('time') === "" ? 0 : _getCookie('time');
        var _duration = _getCookie('duration') === "" ? 0 : _getCookie('duration');

        var _playlistName = '';
        document.cookie = "trackidx=0";
        var _trackIdx = _getCookie('trackidx') === "" ? 0 : _getCookie('trackidx');

        console.log(_getCookie('playlist'));
        document.cookie = "playlist=" + JSON.stringify("[]").replace(/=/g, '\\=');
        var _playlist = JSON.parse(_getCookie('playlist').replace(/=\\/g, '=')) === "" ? [] : JSON.parse(_getCookie('playlist'));
        console.log(_playlist);

        return {
            get playlist()
            {
                return _playlist;
            },
            set playlist( v )
            {
                document.cookie = "playlist=" + JSON.stringify(v).replace(/=/g, '\\=');
                _playlist = v;
            },
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
                document.cookie = "playershrinked=" + v;
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
                document.cookie = "playlistopen=" + v;
            },
            get currentTime()
            {
                return _currentTime;
            },
            set currentTime( v )
            {
                _currentTime = v;
                document.cookie = "time=" + ( v );
            },
            get formattedCurrentTime()
            {
                return _formatTime( this.currentTime );
            },
            set duration( v )
            {
                _duration = v;
            },
            get formattedDuration()
            {
                return _formatTime( _duration );
            },
            set playlistName( v )
            {
                _playlistName = v;
            },
            get playlistName()
            {
                return _playlistName
            },
            get trackIdx()
            {
                return _trackIdx;
            },
            set trackIdx( v )
            {
                _trackIdx = v;
                document.cookie = "trackidx=" + v;
            },
            get isPlaying()
            {
                return _isPlaying;
            },
            set isPlaying( v )
            {
                _isPlaying = v;
                document.cookie = "isplaying=" + v;
            }
        }
    } )();

    var view = {
        playerElement: undefined,
        playerInnerElement: undefined,
        togglePlaylistButtonElement: undefined,
        renderPlaylistItem: function( itemData )
        {
            var isCurrentTrack = ( parseInt( itemData.trackIdx ) === parseInt( data.trackIdx ) );
            console.log( "isCurrentTrack: " + isCurrentTrack );
            return `
        <a href="#" class="list-group-item list-group-item-action ${((isCurrentTrack) ? ' active' : '')}" data-track-idx="${itemData.trackIdx}">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${itemData.title}</h5>
            <small class="text-muted">${_formatTime(itemData.duration)}</small>
          </div>
          <p class="mb-1">${itemData.artist}</p>
          <small class="text-muted">${itemData.album}</small>
        </a>
        `;
        },
        renderPlaylist: function()
        {
          console.log(data.playlist);
            return `
        <div id="playlist-container" class="container h-100 p-1 p-sm-2 p-lg-5 p-xl-5 rounded">
          <div id="playlist-header" class="">
            <h4>${data.playlistName}</h4>
          </div>
          <div id="playlist-body" class="list-group rounded">
          ${(data && Array.isArray(data.playlist)) ? data.playlist.map(function(itemData, idx) {
            return view.renderPlaylistItem(Object.assign({trackIdx: idx}, itemData));
          }).join("") : ''}
          </div>
        </div>`;
        },
        renderDefault: function()
        {
            var trackInfo = data.playlist[ data.trackIdx ];
            return `
        <div class="col h-100">

          <div id="current-album-figure" class="row h-75 justify-content-center align-items-center">
            <img class="h-75" src="${trackInfo && trackInfo.artworkSrc ? trackInfo.artworkSrc : ''}">
          </div>

          <div class="row h-25 justify-content-left align-items-start">
            <div class="col px-md-5 h-100 align-items-center d-flex justify-content-around" style="flex-direction: column;">
              <div class="song-artist row no-gutters justify-content-left py-1 px-2 py-md-2 px-md-3 w-75 h-25">
                <i class="fa fa-user fa-lg mr-4"></i>${trackInfo && trackInfo.artist ? trackInfo.artist : ''}
              </div>
              <div class="song-album row no-gutters justify-content-left py-1 px-2 py-md-2 px-md-3 w-75 h-25">
                <i class="fa fa-music fa-lg mr-4"></i>${trackInfo && trackInfo.album ? trackInfo.album : ''}
              </div>
              <div class="song-title row no-gutters justify-content-left py-1 px-2 py-md-2 px-md-3 w-75 h-25">
                <i class="fa fa-headphones fa-lg mr-4"></i>${trackInfo && trackInfo.title ? trackInfo.title : ''}
              </div>
            </div>
          </div>
        </div>`;
        },
        renderLargeInner: function()
        {
            var innerString = '<div id="tp-player-inner" class="row pt-1 pt-sm-2 pt-md-3 pt-lg-4 pt-xl-4">';

            if ( data.isPlaylistOpen )
            {
                innerString += this.renderPlaylist();
            }
            else
            {
                innerString += this.renderDefault();
            }
            innerString += '</div>';
            return innerString;
        },
        renderLarge: function()
        {
            return `${this.renderLargeInner()}
      <div id="tp-player-bottom" class="row no-gutters align-items-center">
        <a href="javascript:void(0)" id="playlist-toggle">
          <i class="fa fa-list-ul"></i>
        </a>

        <div class="col rounded h-75 inner">
          <div class="row no-gutters h-50 justify-content-center">

            <div class="col col-sm col-md-2 col-lg-3 col-xl-2 ml-md-auto align-self-center text-center" style="white-space:nowrap;">
               <span id="play-current-time" class="play-current-time">${data.formattedCurrentTime}</span> / <span id="play-duration-time" class="play-total-time">${data.formattedDuration}</span>
            </div>

            <div class="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-10 align-self-center">
              <div id="progressbar" class="progress row no-gutters mr-md-4">
                <div id="progressbar-inner" class="bar progress-bar" style="width: ${data.progress};"></div>
              </div>
            </div>

          </div>

          <div class="action-button row no-gutters align-items-center h-50">
            <div class="col text-center">
              <a id="prev-button" href="javascript:void(0)" class="controls prev col text-center">
                <i class="fa fa-step-backward fa-2x"></i>
              </a>
            </div>
            <div class="col text-center">
              <a id="play-pause-button" href="javascript:void(0)" class="controls play-pause active col text-center">
                <i class="fa fa-${data.isPlaying ? 'pause' : 'play'} fa-2x"></i>
              </a>
            </div>
            <div class="col text-center">
              <a id="next-button" href="javascript:void(0)" class="controls next col text-center">
                <i class="fa fa-step-forward fa-2x"></i>
              </a>
            </div>
          </div>


        </div>


      </div>`;
        },
        renderShrinkedInner: function()
        {
            var trackInfo = data.playlist[ data.trackIdx ];
            return `
            <div id="tp-player-inner" class="row no-gutters w-75 h-100 d-inline-flex">

              <div class="col h-100 d-flex">

                <div id="current-album-figure" class="row no-gutters h-100 justify-content-center align-items-center w-25 d-inline-flex">
                  <img class="h-75" src="${trackInfo && trackInfo.artworkSrc ? trackInfo.artworkSrc : ''}">
                </div>

                <div class="row no-gutters h-100 justify-content-start align-items-center w-75 d-inline-flex">


                  <div class="">

                    <div class="song-title row no-gutters justify-content-left align-items-center py-1 px-2">
                      ${trackInfo && trackInfo.title ? trackInfo.title : ''}
                    </div>

                    <div class="song-artist row no-gutters justify-content-left align-items-center py-1 px-2">
                      ${trackInfo && trackInfo.artist ? trackInfo.artist : ''}
                    </div>

                  </div>


                </div>

              </div>
            </div>`;
        },
        renderShrinked: function()
        {
            return `
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
              <span aria-hidden="true">×</span>
            </button>

            ${this.renderShrinkedInner()}
            <div class="row w-25 h-100 d-inline-flex align-items-center">

              <div class="col h-100">
                ${/*<div class="row h-50 justify-content-center">

                  <div class="col-11 col-sm-10 col-md-10 col-lg-9 col-xl-10 align-self-center mb-2">
                    <div id="progressbar" class="progress row">
                      <div id="progressbar-inner" class="bar progress-bar" style="width:${data.progress};"></div>
                    </div>
                  </div>

                </div>*/' '}

                <div class="action-button row justify-content-center h-100">
                  <div class="col text-center align-self-center">
                    <a id="play-pause-button" href="javascript:void(0)" class="controls play-pause active col text-center h-100">
                      <i class="fa fa-${data.isPlaying ? 'pause' : 'play'} fa-2x w-100 h-100"></i>
                    </a>
                  </div>
                </div>


              </div>


            </div>`;
        },
        render: function()
        {
          console.log("data.isPlayerShrinked:"+ data.isPlayerShrinked);
            if ( data.isPlayerShrinked )
            {
                console.log("rendering shrinked view");
                this.playerElement.innerHTML = this.renderShrinked();
                this.playerElement.className = "container-fluid d-flex shrinked";
                this.playerElement.style.top = "";
            }
            else
            {
                this.playerElement.innerHTML = this.renderLarge();
                this.playerElement.className = "container-fluid";
                this.playerElement.style.top = '0px'
            }
            console.log( data.isPlayerShrinked );

            rendered = true;
        },
        update: function()
        {
            this.playerElement = document.getElementById( PLAYER_CONTROLLER_ID );
            this.playerAudioElement = document.getElementById( PLAYER_AUDIO_ID );
            if ( data.isPlaying )
            {

            }
            else
            {
                this.playerAudioElement.pause();
            }

            if ( data.isPlayerOpen )
            {
                this.render();
                if ( data.isPlayerShrinked )
                {
                    console.log( this.playerElement.querySelector( 'button.close' ) );
                    this.buttonCloseElement = this.playerElement.querySelector( 'button.close' );
                }
                this.playerInnerElement = this.playerElement.querySelector( '#' + PLAYER_INNER_ID );
                this.playStopButtonElement = document.getElementById( PLAY_STOP_BUTTON_ID );


                if ( !data.isPlayerShrinked )
                {
                    this.progressBarElement = document.getElementById( PROGRESS_BAR_ID );
                    this.progressBarInnerElement = document.getElementById( PROGRESS_BAR_INNER_ID );
                    this.togglePlaylistButtonElement = document.getElementById( BUTTON_TOGGLE_PLAYLIST_ID );

                    view.playerCurrentTimeSpanElement = document.getElementById( PLAYER_CURRENT_TIME_ID );
                    view.playerDurationSpanElement = document.getElementById( PLAYER_DURATION_TIME_ID );

                    view.prevTrackButtonElement = document.getElementById( PREV_BUTTON_ID );
                    view.nextTrackButtonElement = document.getElementById( NEXT_BUTTON_ID );

                    if ( data.isPlaylistOpen )
                    {
                        view.playlistItems = document.getElementById( 'playlist-body' ).querySelectorAll( 'a.list-group-item' );
                        for ( var i = 0; i < view.playlistItems.length; i++ )
                        {
                            view.playlistItems[ i ].className = view.playlistItems[ i ].className.replace( 'active', '' );
                            if ( view.playlistItems[ i ].dataset.trackIdx === data.trackIdx )
                            {
                                view.playlistItems[ i ].className += ' active';
                            }
                        }
                    }
                }
            }
            else
            {
                console.log( 'player is clfosed' );
                this.playerElement.style.setProperty( 'display', 'none', 'important' );
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
        /*
          largePlayerString = view.playerElement.innerHTML;
          console.log( largePlayerString ); */
        view.playerElement.removeEventListener( 'mouseup', onMouseUp );
        view.playerElement.removeEventListener( 'touchend', onMouseUp );
        window.removeEventListener( 'mousemove', onMouseMove );
        window.removeEventListener( 'touchmove', onMouseMove );
        view.playerElement.onmouseup = null;
        view.playerElement.className += ' hiding';
        data.isPlayerShrinked = true;

        setTimeout( () =>
        {
            for ( var i = 0; i < view.playerElement.childNodes.length; i++ )
            {
                var child = view.playerElement.childNodes[ i ];
                child.parentNode.removeChild( child );
            }
            console.log( view.playerElement );
        }, 40 );

        setTimeout( () =>
        {

            //view.playerElement.innerHTML = shrinkedPlayerString;
            data.playerY = data.playerStartY;
            view.update();
            setupListeners();
        }, 200 );

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

        //console.log( "onMouseMove" );
        var currentX;
        if ( event.pageY )
        {
            //currentX = event.pageX;
            data.playerY = event.pageY;
        }
        else if ( event.touches && event.touches.length > 0 )
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
                data.playerStartY = event.pageY;
            }
            else
            {
                data.playerStartY = event.touches[ 0 ].pageY;
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
            console.log( "my mousedown NO!" );
            console.log( "restore player" )
            data.isPlayerShrinked = false;
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


    var stopPropagation = function( e )
    {
        e.stopPropagation();
    };

    var playStop = function()
    {
        var p = view.playerAudioElement;
        console.log( "my mouseclick" );
        data.isPlaying = !data.isPlaying;
        // TODO: ADD THIS GET AND SETTERS
        if ( data.isPlaying )
        {
            var trackData = data.playlist[ data.trackIdx ];
            var newAudioSrc = trackData ? trackData.audioSrc : '';
            if ( p.src !== newAudioSrc )
            {
                p.src = newAudioSrc;
            }

            if ( p.readyState === VIDEO_STATE_HAVE_ENOUGH_DATA )
            {
                console.log( "VIDEO_STATE_HAVE_ENOUGH_DATA" );
                p.play();
            }
            else
            {
                console.log( "setting autoplay" );
                p.autoplay = true;
                //p.src = data.playlist[ data.trackIdx ].audioSrc;
            }
            console.log( p.duration );
            data.duration = p.duration;
            //view.playStopButtonElement.querySelector( 'i' ).className = "fa fa-pause fa-2x";
        }
        else
        {
            //view.playStopButtonElement.querySelector( 'i' ).className = "fa fa-play fa-2x";
            p.autoplay = false;
            p.pause();
        }

        if ( p.readyState )
        {
            view.playStopButtonElement.querySelector( 'i' ).classList.toggle( 'fa-pause' );
            view.playStopButtonElement.querySelector( 'i' ).classList.toggle( 'fa-play' );
        }

    }

    var onPlayStopButtonClick = function()
    {
        playStop();

    };

    var onAudioTimeUpdate = function()
    {
        var p = view.playerAudioElement;
        //console.log( 'time update' );
        data.currentTime = p.currentTime;

        //duration should be set only on audio loaded
        //console.log( p.duration );
        data.duration = p.duration

        var perc = 100 * data.currentTime / p.duration;
        data.progress = perc + '%';


        if ( !data.isPlayerShrinked )
        {
            view.playerCurrentTimeSpanElement.innerText = data.formattedCurrentTime;
            //console.log( data.formattedDuration );
            view.playerDurationSpanElement.innerText = data.formattedDuration;
            view.progressBarInnerElement.style.width = data.progress;
        }

    };

    var onProgressBarMouseUp = function( e )
    {
        var p = view.playerAudioElement;
        window.removeEventListener( 'mouseup', onProgressBarMouseUp );
        window.removeEventListener( 'touchend', onProgressBarMouseUp );

        view.progressBarElement.removeEventListener( 'mousemove', onProgressBarMouseMove );
        view.progressBarElement.removeEventListener( 'touchmove', onProgressBarMouseMove );


        var perc = ( e.offsetX * 100 / view.progressBarElement.clientWidth );
        p.addEventListener( 'timeupdate', onAudioTimeUpdate );
        console.log( "p.duration:" + p.duration )
        p.currentTime = p.duration * perc / 100;
    }

    var onProgressBarMouseDown = function( e )
    {
        var p = view.playerAudioElement;
        stopPropagation( e );
        p.removeEventListener( 'timeupdate', onAudioTimeUpdate );
        view.progressBarElement.addEventListener( 'mousemove', onProgressBarMouseMove );
        view.progressBarElement.addEventListener( 'touchmove', onProgressBarMouseMove );
        window.addEventListener( 'mouseup', onProgressBarMouseUp );
        window.addEventListener( 'touchend', onProgressBarMouseUp );
    };

    var onProgressBarMouseMove = function( e )
    {
        if ( event.touches && event.touches.length > 0 )
        {

        }
        else
        {

        }
        console.log( e );
        console.log( e.offsetX );
        var perc = e.offsetX * 100 / view.progressBarElement.clientWidth;
        view.progressBarInnerElement.style.width = perc + '%';
    };

    var onPlaylistItemClick = function()
    {
        console.log( this );
        data.isPlaying = false;
        data.trackIdx = this.dataset.trackIdx;
        data.currentTime = '';
        view.update();
        playStop();
        setupListeners();
    };

    var onPrevTrackButtonClick = function()
    {
        console.log( "onPrevTrackButtonClick" );
        if ( parseInt( data.trackIdx ) > 0 )
        {
            data.isPlaying = false;
            data.trackIdx = data.trackIdx - 1;
            data.currentTime = '';
            view.update();
            playStop();
            setupListeners();
        }
    };
    var onNextTrackButtonClick = function()
    {
        console.log( "onNextTrackButtonClick" )
        if ( parseInt( data.trackIdx ) + 1 < data.playlist.length )
        {
            data.isPlaying = false;
            data.trackIdx = parseInt( data.trackIdx ) + 1;
            data.currentTime = '';
            view.update();
            playStop();
            setupListeners();
        }
    };

    setupListeners = function()
    {
        console.log( "setup listeners" )
        setupScrollingViewToBottomListeners();

        var p = view.playerAudioElement;
        // playlist Toggle
        if ( !data.isPlayerShrinked )
        {
            view.togglePlaylistButtonElement.addEventListener( 'mousedown', stopPropagation );
            view.togglePlaylistButtonElement.addEventListener( 'touchstart', stopPropagation );
            view.togglePlaylistButtonElement.addEventListener( 'click', togglePlaylist );

            view.progressBarElement.addEventListener( 'mousedown', onProgressBarMouseDown );

            if ( data.isPlaylistOpen )
            {
                for ( var i = 0; i < view.playlistItems.length; i++ )
                {
                    view.playlistItems[ i ].addEventListener( 'click', onPlaylistItemClick );
                }
            }

            view.prevTrackButtonElement.addEventListener( 'mousedown', stopPropagation );
            view.prevTrackButtonElement.addEventListener( 'touchstart', stopPropagation );
            view.prevTrackButtonElement.addEventListener( 'click', onPrevTrackButtonClick );

            view.nextTrackButtonElement.addEventListener( 'mousedown', stopPropagation );
            view.nextTrackButtonElement.addEventListener( 'touchstart', stopPropagation );
            view.nextTrackButtonElement.addEventListener( 'click', onNextTrackButtonClick );
        }
        else
        {
            view.buttonCloseElement.addEventListener( 'mousedown', stopPropagation );
            view.buttonCloseElement.addEventListener( 'touchstart', stopPropagation );
            view.buttonCloseElement.addEventListener( 'click', function()
            {
                console.log( 'on click buttonCloseElement' );
                data.isPlayerOpen = false;
                data.isPlaying = false;
                data.isPlayerShrinked = false;
                view.update();
            } );

            p.addEventListener( 'timeupdate', onAudioTimeUpdate );
        }




        // Play/Stop
        view.playStopButtonElement.addEventListener( 'mousedown', stopPropagation );
        view.playStopButtonElement.addEventListener( 'touchstart', stopPropagation );
        setTimeout( () =>
        {
            view.playStopButtonElement.addEventListener( 'click', onPlayStopButtonClick );
        }, 200 );




        p.addEventListener( 'ended', function()
        {
            data.isPlaying = false;
            view.playStopButtonElement.querySelector( 'i' ).className = "fa fa-play fa-2x";
            console.log( "audio ended." );

            if ( data.shouldAutoPlayNext )
            {
                loadNextInPlaylist();
            }
        } )


    };

    data.isPlayerOpen = true;
    view.update();
    setupListeners();

    return {
        loadTrack: function( trackData )
        {
            data.isPlayerShrinked = false;
            data.isPlaylistOpen = false;
            data.isPlaying = false;
            data.playlist = [
                trackData
            ];
            data.currentTime = '';

            console.log( data );
            view.update();
            playStop();
            setupListeners();
        },
        loadPlaylist: function( playlistId )
        {
            get( '/playlist/' + playlistId + '/json', function( res )
            {
                console.log( res );
                data.isPlayerShrinked = false;
                data.isPlaylistOpen = false;
                data.isPlaying = false;
                data.playlistName = res.name;
                data.playlist = res.tracks.map( function( trackData )
                {
                    return {
                        title: trackData.title,
                        artworkSrc: trackData.artwork_uri,
                        audioSrc: trackData.uri,
                        artist: trackData.artist_name,
                        album: trackData.album,
                        duration: trackData.duration,
                        progress: 0
                    };
                } );
                data.currentTime = '';

                console.log( data );
                view.update();
                playStop();
                setupListeners();
            } );

        }
    }

} )();
