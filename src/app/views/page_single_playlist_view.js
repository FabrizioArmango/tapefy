var PageBaseView = require( './page_baseview' );

var PageSinglePlaylistView = function( model )
{
    PageBaseView.call( this, model );
    console.log( "PageSinglePlaylistView.constructor" );
};

PageSinglePlaylistView.prototype = Object.create( PageBaseView.prototype );
PageSinglePlaylistView.prototype.constructor = PageSinglePlaylistView;
PageSinglePlaylistView.prototype.render = function()
{
    console.log( "PageSinglePlaylistView.render" );
    console.log( this.model.session.user );
    console.log( this.model.createdBy );
    console.log(this.model);
    if ( this.model.session.login )
    {
        console.log("this.model.session.user.id: "+ this.model.session.user.id);
        console.log("this.model.createdBy: "+ this.model.createdBy);
        if ( this.model.isNew )
        {
            if (this.model.data) {
              console.log("this.model.data", this.model.data)
            }
            this.model.html.content = newPlaylistForm();
            return PageBaseView.prototype.render.call( this );
        }
        else if ( this.model.isPlaylistNotFound )
        {
            this.model.html.content = `PlAYLIST INESISTENTE`;
            return PageBaseView.prototype.render.call( this );
        }
        else if ( this.model.session.user.id && this.model.createdBy && this.model.session.user.id === this.model.createdBy )
        {
            this.model.html.content = editPlaylistForm.call(this);
            return PageBaseView.prototype.render.call( this );
        }
    }
    return this.renderUnauthorized();
};


function newPlaylistForm() {
  return `
  <form action="/playlist/new" method="post">
    <div class="form-group">
      <label for="form-name-input">Nome</label>
      <input type="text" class="form-control" id="form-name-input" placeholder="Nome" name="name">
    </div>
    <div class="form-group">
      <label for="form-desc-input">Descrizione</label>
      <input type="text" class="form-control" id="form-desc-input" placeholder="Descrizione" name="desc">
    </div>
    <div class="form-group">
      <label for="form-visibility-select">Visibilità</label>
      <select id="form-visibility-select" class="form-control" name="visibility">
        <option value="private" selected>Privata</option>
        <option value="friends">Amici</option>
        <option value="community">Community</option>
      </select>
    </div>
    <button type="submit" class="btn btn-primary">Crea</button>
  </form>
  `;
}

function editPlaylistForm() {
  var t = this;
  return `
  <form action="/playlist/delete/${t.model.db.id}" method="get" class="text-right">
    <button type="submit" class="btn btn-danger">Elimina</button>
  </form>
  <form action="/playlist/edit" method="post">
    <input type="hidden" value="${t.model.db.id}" name="playlist_id" />
    <div class="form-group">
      <label for="form-name-input">Nome</label>
      <input type="text" class="form-control" id="form-name-input" placeholder="${t.model.db.name}" name="name" value="${t.model.db.name}">
    </div>
    <div class="form-group">
      <label for="form-desc-input">Descrizione</label>
      <input type="text" class="form-control" id="form-desc-input" placeholder="${t.model.db.desc}" name="desc" value="${t.model.db.desc}">
    </div>
    <div class="form-group">
    <label for="track-list">Tracce</label>
      <div id="track-list" class="list-group rounded">
      ${t.model.db.tracks.map(function(trackData) {
        return `
        <a href="#" class="list-group-item list-group-item-action">
          <div class="d-flex w-100 justify-content-between">
            <h5 class="mb-1">${trackData.title}</h5>
            <small class="text-muted">${trackData.duration}</small>
          </div>
          <p class="mb-1">${trackData.artist}</p>
          <small class="text-muted">${trackData.album}</small>

          <button
            type="button"
            class="btn btn-danger remove"
            data-playlist-id="${t.model.db.id}"
            data-song-id="${trackData.id}"
            style="
                position: absolute;
                right: 0;
                margin-right: 0.25rem;
                margin-bottom: 0.25rem;
                bottom: 0;
            "
            >RIMUOVI</button>
        </a>
        `;
      }).join("")}
      </div>
    </div>
    <div class="form-group">
      <label for="form-visibility-select">Visibilità</label>
      <select id="form-visibility-select" class="form-control" name="visibility">
      ${[
        {
          id: 'private',
          desc: 'Privata',
        },
        {
          id: 'friends',
          desc: 'Amici'
        },
        {
          id: 'community',
          desc: 'Community'
        }
      ].map(function(visibilityData) {
        return `<option value="${visibilityData.id}" ${visibilityData.id === t.model.db.visibility ? 'selected' : ''} >${visibilityData.desc}</option>`
      })}
      </select>
    </div>
    <button type="submit" class="btn btn-primary">SALVA MODIFICHE</button>
  </form>
  <script>
  var removeButtons = document.querySelector('#track-list').querySelectorAll('button.remove');
  for (var i = 0; i < removeButtons.length; i++) {
    removeButtons[i].onclick = removeTrackFromPlaylist;
  }
  function removeTrackFromPlaylist() {

    get( '/playlist/' + this.dataset.playlistId + '/removefortrack/' + this.dataset.songId, function( res )
    {
      window.location.reload();
    } );
  }
  </script>
  `;
}

module.exports = PageSinglePlaylistView;
