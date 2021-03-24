var CardSong = require('./card_song');

var CardFactory = (function() {
  return {
    create: create
  }
})();

module.exports = CardFactory;

function create(data) {
  switch(data.type) {
    case 'song':
      return new CardSong(data);
    break;
  }
}
