var Model = require( './model' );

var PageBaseModel = function( data )
{
    Model.call( this, data );
    console.log( "PageBaseModel.constructor" );

    this.stylesheets = [];
};

PageBaseModel.prototype = Object.create( Model.prototype );
PageBaseModel.prototype.constructor = PageBaseModel;

module.exports = PageBaseModel;
