var PageBaseView = require( './page_baseview' );


var PageCommunityView = function( model )
{
    PageBaseView.call( this, model );
    console.log( "PageCommunityView.constructor" );
};

PageCommunityView.prototype = Object.create( PageBaseView.prototype );
PageCommunityView.prototype.constructor = PageCommunityView;
PageCommunityView.prototype.render = function()
{
    console.log( "PageCommunityView.render" );
    var t = this;
    if ( this.model.session.login )
    {
        this.model.html.content = `
        <h5>Online adesso</h5>
        <div class="list-group">${this.model.users.map(function(userData) {
          return `<div class="list-group-item">
          ${userData.user_id} - ${userData.first_name} - ${userData.last_name}
          ${userData.user_id !== t.model.session.user.id ? `
          <input id="user-list-${userData.user_id}" type="checkbox" ${userData.isFriend ? 'checked' : ''} >
          <label for="user-list-${userData.user_id}">Amico</label>
          ${userData.isListening ? '- Sta ascoltando ' + userData.currentPlaylist: ''}`
          : ''
          }
            </button>
          </div>
          <script>
          var checkboxes = document.querySelectorAll('input[type=checkbox]');
          for (var i = 0; i < checkboxes.length; i++) {
            checkboxes[i].onclick = function() {
              if (this.checked) {
                get('/community/friends/add/', function(){

                });
              } else {
                get('/community/friends/remove/', function(res){
                });
              }
              window.location = "/community";
            }
          }
          </script>

          `
        }).join("")}</div>
        `;
        return PageBaseView.prototype.render.call( this );
    }
    else
    {
        return this.renderUnauthorized();
    }
};

module.exports = PageCommunityView;
