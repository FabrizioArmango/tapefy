var CardSongView = function() {};

CardSongView.prototype.constructor = CardSongView;
CardSongView.prototype.render = function( model )
{
    console.log( "CardSongView.prototype.render" );
    console.log( model );
    return `<div class="card song" style="max-width: 540px;" data-uri="${model.uri}" itemscope itemtype="http://schema.org/MusicRecording">
      <input type="radio" name="playlist" id="song-${model.id}" class="toggle-input">
      </input>
      <label for="song-${model.id}" class="w-100">
        <div class="row no-gutters">
          <div class="col-5 col-sm-4 col-md-4 col-lg-4 col-xl-4">
            <img class="track-artwork card-img" src="${model.artwork}" alt="...">
          </div>
          <div class="col-7 col-sm-8 col-md-8 col-lg-8 col-xl-8">
            <div class="card-body pb-0 p-lg-3 px-2 pt-0 pt-xl-3">
              <h5 class="track-name card-title mt-1 mb-1" itemprop="name">${model.name}</h5>
                <div
                  class="playlist-wrapper"
                  style="position: absolute; right: 3rem; bottom: 0;"
                >
                  <input type="hidden" name="track-id" class="track-id" value="${model.id}">
                  <button
                    type="button"
                    class="close py-1 pr-4"
                    data-dismiss="alert"
                    aria-label="Close"
                    style="z-index: 100;"
                  >
                    <span aria-hidden="true">×</span>
                  </button>

                  <button
                    type="submit"
                    role="toggle"
                    class="btn btn-secondary btn-sm playlist"
                    style="position: absolute; right: 0; bottom: 0;"
                  >AGGIUNGI A PLAYLIST</button>
                </div>

              <button
                role="toggle"
                class="btn btn-primary btn-sm play"
                style="position: absolute; right: 0; bottom: 0;"
              ><i class="fa fa-play fa-2x"></i></button>

              <p class="card-text"><span class="track-artist" itemprop="byArtist">${model.artist}</span> - <span class="track-album" itemprop="https://schema.org/inAlbum">${model.album}</span></p>
              <p class="card-text text-right"><small class="text-muted track-duration" itemprop="duration">${model.duration}</small></p>
              <p class="card-text"><small class="text-muted track-genre" itemprop="genre">${model.genre}</small></p>
            </div>
          </div>
        </div>
      </label>
  </div>`;
};

module.exports = CardSongView;
