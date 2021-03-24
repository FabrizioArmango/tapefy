var PageBaseView = require( './page_baseview' );

var PageNotFoundView = function( model )
{
    PageBaseView.call( this, model );
    console.log( "PageNotFoundView.constructor" );
};

PageNotFoundView.prototype = Object.create( PageBaseView.prototype );
PageNotFoundView.prototype.constructor = PageNotFoundView;
PageNotFoundView.prototype.render = function()
{
    console.log( "PageNotFoundView.render" );
        this.model.html.content = `<h4>${this.model.dict.not_found.error}</h4><p>${this.model.dict.not_found.desc}</p>
        <script>
        setTimeout(function() {
          window.location.href = '/home';
        }, 5000);
        </script>
        `;


    return PageBaseView.prototype.render.call( this );
};

module.exports = PageNotFoundView;
