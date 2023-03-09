var
    PageLoginModel = require( '../models/page_login_model' ),
    PageLoginView = require( '../views/page_login_view' );

var
    PageBaseController = require( './page_basecontroller' );

var
    db = require( './db' );

var // CONSTRUCTOR
    PageLoginController = function( options )
    {
        options = Object.assign(
        {
            title: options.dict.login.title,
            author: 'Fabrizio Armango',
            copyright: 'Fabrizio Armango',
            description: 'pagina HTML5 di esempio per uso dei tag semantici'
        }, options );

        PageBaseController.call( this, options );

        console.log( "PageLoginController.constructor" );
        this.model = new PageLoginModel( options );

        if ( options.session )
        {
            //console.log( options.session )
            this.model.session = options.session;
            if ( options.data )
            {


                var data = options.data;
                if ( data.email )
                {
                    this.model.email = data.email;
                    this.model.isEmailMissing = false;
                }
                else
                {
                    this.model.shouldShowAlert = true;
                }

                if ( data.password )
                {
                    this.model.password = data.password;
                    this.model.isPasswordMissing = false;
                }
                else
                {
                    this.model.shouldShowAlert = true;
                }
            }
        }

        console.log( "this.model" );
        console.log( this.model );
        this.view = new PageLoginView( this.model );
        console.log( "this.view" );
        console.log( this.view );


        this.navBar.page = 'login';
    };

PageLoginController.prototype = Object.create( PageBaseController.prototype );
PageLoginController.prototype.constructor = PageLoginController;
PageLoginController.prototype.render = function( onReadyCallback )
{
    console.log( "PageLoginController.render" );
    var t = this;
    PageBaseController.prototype.render.call( t, function()
    {
        if ( t.model.email && t.model.password ) // CASE POST
        {
            db.userLogin( t.model, function( dbResponse )
            {
                console.log( dbResponse );
                if ( dbResponse.statusCode === db.ERROR_USER_NOT_EXISTS )
                {
                    t.model.isEmailNotFound = true;
                    t.model.shouldShowAlert = true;
                }
                else if ( dbResponse.statusCode === db.ERROR_WRONG_PASSWORD )
                {
                    t.model.isPasswordWrong = true;
                    t.model.shouldShowAlert = true;
                }
                else if ( dbResponse.statusCode === db.RESULT_WAS_FOUND )
                {
                    t.model.isEmailNotFound = false;
                    t.model.isPasswordWrong = false;
                    t.model.session.login = true;
                    t.model.session.user = {
                        id: dbResponse.rows[ 0 ].user_id,
                        email: t.model.email,
                        firstName: dbResponse.rows[ 0 ].first_name,
                        lastName: dbResponse.rows[ 0 ].last_name
                    }
                    console.log( t.model.session );
                    //dbResponse.result
                }
                onReadyCallback( t.view.render() );


            } );
        }
        else // CASE GET
        {
            /*
              if (undefined === t.model.email) {
                t.model.isEmailMissing = true;
              }*/
            onReadyCallback( t.view.render() );
        }

    } );
};

module.exports = PageLoginController;
