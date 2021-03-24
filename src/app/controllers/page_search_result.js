var
    PageSearchResultModel = require( '../models/page_search_result_model' ),
    PageSearchResultView = require( '../views/page_search_result_view' );

var
    PageBaseController = require( './page_basecontroller' );

var
    db = require( './db' ),
    CardFactory = require( './card_factory' );


var PageSearchResultController = function( options )
{
    options = Object.assign(
    {
        title: 'Ricerca',
        author: 'Fabrizio Armango',
        copyright: 'Fabrizio Armango',
        description: 'pagina HTML5 di esempio per uso dei tag semantici',
        query: options.query
    }, options );

    PageBaseController.call( this, options );

    console.log( "PageSearchResultController.constructor" );
    this.model = new PageSearchResultModel( options );
    console.log( "this.model" );
    console.log( this.model );
    this.view = new PageSearchResultView( this.model );
    console.log( "this.view" );
    console.log( this.view );


    this.navBar.page = 'search_result';

    /*
    this.model.results = db.getSearchQueryResults(this.model.query).map((searchResultData) => {
      return CardFactory.create(searchResultData);
    });*/
};


PageSearchResultController.prototype = Object.create( PageBaseController.prototype );
PageSearchResultController.prototype.constructor = PageSearchResultController;
PageSearchResultController.prototype.render = function( onReadyCallback )
{
    console.log( "PageSearchResultController.render" );
    var t = this;
    PageBaseController.prototype.render.call( t, function()
    {
        console.log( db );
        if ( undefined === t.model.query || t.model.query === '' )
        {
            t.model.results = [];
            onReadyCallback( t.view.render() );
        }
        else
        {
            console.log( t );

            db.getSearchQueryResults(
            {
                query: t.model.query,
                onData: function( rows )
                {
                    console.log( rows );
                    t.model.results = rows.map( function( searchResultData )
                    {
                        return CardFactory.create( searchResultData );
                    } );
                    onReadyCallback( t.view.render() );
                },
                onError: function( error )
                {
                    t.model.results = [];
                    onReadyCallback( t.view.render() );
                }
            } );
        }
    } );
};

module.exports = PageSearchResultController;
