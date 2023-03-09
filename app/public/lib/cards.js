var cardElements = document.querySelectorAll( '.card.song' );

for ( var i = 0; i < cardElements.length; i++ )
{
    cardElements[ i ].querySelector( 'button.play' ).addEventListener( 'click', onCardPlayButtonClick.bind( cardElements[ i ] ) );
    cardElements[ i ].querySelector( 'button.playlist' ).addEventListener( 'click', onCardAddToPlaylistButtonClick );
}


function onCardPlayButtonClick()
{
    ComponentPlayer.loadTrack(
    {
        title: this.querySelector( '.track-name' ).innerText,
        artworkSrc: this.querySelector( '.track-artwork' ).src,
        audioSrc: this.dataset.uri,
        artist: this.querySelector( '.track-artist' ).innerText,
        album: this.querySelector( '.track-album' ).innerText,
        duration: this.querySelector( '.track-duration' ).innerText,
        progress: 0
    } );
    console.log( this.dataset.uri )
}


function onCardAddToPlaylistButtonClick( e )
{
    e.stopPropagation();
    console.log( "onCardAddToPlaylistButtonClick" );
    e.target.removeEventListener( 'click', onCardAddToPlaylistButtonClick );


    console.log( "e.target.parentNode: ", e.target.parentNode );
    var trackId = e.target.parentNode.querySelector( '.track-id' ).value;
    get( '/playlist/fortrack/' + trackId, function( res )
    {
        activatePlaylistMenu(
        {
            playlists: res,
            trackId: trackId,
            containerElement: e.target.parentNode
        } );
    } );



}

function activatePlaylistMenu( options )
{
    // options.playlists;
    var buttonCloseElement = options.containerElement.querySelector( 'button.close' );
    var ulElement = document.createElement( 'div' );
    ulElement.id = "playlist-ul";
    ulElement.className = "list-group rounded"
    ulElement.innerHTML = `
      ${options.playlists.map(function(playlistData) {
        return `<div class="list-group-item list-group-item-action">
          <h6>${playlistData.name}</h6>
          <small>
            <input type="checkbox" name="linked" value="linked" id="checkbox-${playlistData.id}" ${playlistData.linked ? 'checked' : ''} data-song-id="${options.trackId}">
            <label for="checkbox-${playlistData.id}">AGGIUNTO</label>
          </small>
        </div>
        `;
      }).join("")}
      `;
    options.containerElement.appendChild( ulElement );

    buttonCloseElement.style.display = 'block';
    buttonCloseElement.onclick = function( e )
    {
        console.log( "BUTTON CLOSE!" );
        onCloseButtonClick.call( ulElement, e );
    };

    for ( var i = 0; i < options.playlists.length; i++ )
    {
        playlistData = options.playlists[ i ];
        var checkboxElement = ulElement.querySelector( `#checkbox-${playlistData.id}` );
        console.log(checkboxElement);
        checkboxElement.onchange = function( e )
        {
            console.log( e );
            get( `/playlist/${e.target.id.split("-")[1]}/${e.target.checked ? 'add' : 'remove'}fortrack/${e.target.dataset.songId}`, function( res )
            {
                console.log( e );
            } );
        }
        //ulElement.querySelector( `#checkbox-${playlistData.id}` ).dataset.playlistId = playlistData.id;
    }
}

function onCloseButtonClick( e )
{
    console.log( "clicked on close button" );
    console.log( e.target );
    this.parentNode.querySelector( 'button.playlist' ).addEventListener( 'click', onCardAddToPlaylistButtonClick );
    this.parentNode.querySelector( 'button.close' ).style.display = 'none';
    this.parentNode.removeChild( this );
}
