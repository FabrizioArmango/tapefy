var PlayerView = function(model) {
  this.model = model;
};


PlayerView.prototype.constructor = PlayerView;
PlayerView.prototype.render = function() {
  /*
  var htmlString = '<div id="tp-player" class="tp-player dragscroll" >';
  htmlString += '<div id="tp-player-inner" class="tp-player-inner" >';
  htmlString += '<audio id="audio-player"></audio>';
  htmlString += '<div id="current-album-figure" class="album-figure text-center">';
  htmlString += '<img class="img-fluid" src="/imgs/qvc8.jpg" >';
  htmlString += '</div>';
  htmlString += '<div class="current-info container">';
  htmlString += '<div class="song-artist row"><i class="fa fa-user"></i>artist</div>';
  htmlString += '<div class="song-album row"><i class="fa fa-music"></i>albumName</div>';
  htmlString += '<div class="song-title row"><i class="fa fa-headphones"></i>title</div>';
  htmlString += '</div>';
  htmlString += '</div>';
  htmlString += '<div class="controls container">';
  htmlString += '<a href="javascript:void(0)" id="toggle-play-list" class="toggle-play-list"><i class="fa fa-list-ul"></i></a>';
  htmlString += '<div class="duration text-center align-items-center">';
  htmlString += '<span class="pull-left"><span id="play-current-time" class="play-current-time">00:00</span> / <span id="play-duration-time" class="play-total-time">00:00</span></span>';
  htmlString += '</div>';
  htmlString += '<div id="progressbar" class="progress row"><div id="progressbar-inner" class="bar">';
  htmlString += '</div></div>';
  //htmlString += '<input type="range" class="volume col-sm" min="0" max="1" step="0.1" value="0.5" data-css="0.8">';
  htmlString += '<div class="action-button row align-items-center">';
  htmlString += '<a href="javascript:void(0)" class="prev col text-center"><i class="fa fa-step-backward"></i></a>';
  htmlString += '<a id="play-pause-button" href="javascript:void(0)" class="play-pause active col text-center"><i class="fa fa-play"></i></a>';
  htmlString += '<a href="javascript:void(0)" class="next col text-center"><i class="fa fa-step-forward"></i></a>';
  htmlString += '</div>';
  htmlString += '</div>';
  htmlString += '</div>';
  */
 var htmlString = `
 <div id="tp-player-controller" draggable class="container-fluid">

 </div>
 <audio id="audio-player" autoplay=false ></audio>
 `;

  return htmlString;
};

module.exports = PlayerView;
