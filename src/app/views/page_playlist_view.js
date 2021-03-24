var PageBaseView = require( './page_baseview' );

var PagePlaylistView = function( model )
{
    PageBaseView.call( this, model );
    console.log( "PagePlaylistView.constructor" );
};

PagePlaylistView.prototype = Object.create( PageBaseView.prototype );
PagePlaylistView.prototype.constructor = PagePlaylistView;
PagePlaylistView.prototype.render = function()
{
    console.log( "PagePlaylistView.render" );
    if ( this.model.session.login )
    {
        this.model.html.content = `
        <form action="playlist/new" class="text-right mb-1">
          <button type="submit" class="btn btn-primary">Crea Nuova</button>
        </form>
    <div id="my-playlists-container" class="list-group-flush">
      ${this.model.playlists.map((playlistData) => {
        return `<a href="#" class="list-group-item list-group-item-action">
          <input type="radio" name="playlist" id="playlist-${playlistData.id}" class="toggle-input">
          </input>
          <label for="playlist-${playlistData.id}" class="w-100">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${playlistData.name}</h5>
            <form action="/playlist/${playlistData.id}">
              <button type="submit" role="toggle" class="btn btn-secondary btn-sm">DETTAGLI</button>
            </form>
          </div>
          <div class="d-flex w-100 justify-content-between mt-3">
            <h6 class="mb-1">${playlistData.desc}</h6>
            <button role="toggle" class="btn btn-primary btn-sm play" data-id="${playlistData.id}"><i class="fa fa-play fa-2x"></i></button>
          </div>
          </label>
        </a>
        `;
      }).join("")}
    </div>
    <script src="/lib/playlists.js"></script>
  `;
  return PageBaseView.prototype.render.call( this );
} else {
  return this.renderUnauthorized();
}
};

module.exports = PagePlaylistView;
