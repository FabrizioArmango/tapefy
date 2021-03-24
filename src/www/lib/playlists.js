var playlistItemElements = document.getElementById('my-playlists-container').querySelectorAll('a.list-group-item');
for  (var p = 0; p < playlistItemElements.length; p++) {
  playlistItemElements[p].querySelector('button.play').onclick = function() {
    ComponentPlayer.loadPlaylist(this.dataset.id);
  };
}
