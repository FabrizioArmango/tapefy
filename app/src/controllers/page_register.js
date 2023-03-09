var
    PageRegisterModel = require( '../models/page_register_model' ),
    PageRegisterView = require( '../views/page_register_view' );

var
    PageBaseController = require( './page_basecontroller' );

var AuthenticationUtils = require( '../utils/authentication' );

var db = require( './db' );
var PageRegisterController = function( options )
{
    var t = this;
    var options = Object.assign(
    {
        title: 'Registrati',
        author: 'Fabrizio Armango',
        copyright: 'Fabrizio Armango',
        description: 'pagina HTML5 di esempio per uso dei tag semantici'
    }, options );
    
    PageBaseController.call( this, options );
    console.log( "PageRegisterController.constructor" );
    this.model = new PageRegisterModel( options );

    // move options for registration into a key of model and use it in render that has a callback for async result
    if ( options )
    {
        this.model.session = options.session;
        if ( options.data )
        {
            if ( options.data.email )
            {
                this.model.email = options.data.email;
                this.model.isEmailValid = AuthenticationUtils.checkEmailSyntax( this.model.email );
            }

            if ( options.data.first_name )
            {
                this.model.first_name = options.data.first_name;
                this.model.isFirstNameValid = AuthenticationUtils.checkFirstNameSyntax( this.model.first_name );
            }

            if ( options.data.last_name )
            {
                this.model.last_name = options.data.last_name;
                this.model.isLastNameValid = AuthenticationUtils.checkLastNameSyntax( this.model.last_name );
            }

            if ( options.data.birth_date )
            {
                this.model.birth_date = options.data.birth_date;
                this.model.isBirthDateValid = AuthenticationUtils.checkBirthDateSyntax( this.model.birth_date );
            }

            if ( options.data.password )
            {
                this.model.isPasswordValid = AuthenticationUtils.checkPasswordSyntax( this.model.password );
                if ( options.data.password_confirm )
                {
                    if ( options.data.password_confirm === options.data.password )
                    {
                        this.model.isPasswordConfirmValid = true;
                        if ( this.model.isPasswordValid )
                        {
                            this.model.password = options.data.password;
                            if ( this.model.isEmailValid && this.model.isFirstNameValid && this.model.isLastNameValid && this.model.isBirthDateValid )
                            {
                                db.existsEmail( this.model.email, function( flag )
                                {
                                    if ( !flag )
                                    {
                                        db.createUser( t.model );
                                    }
                                    else
                                    {
                                        // email già esistente
                                    }

                                } );
                            }

                        }
                    }
                }
            }


            /*
            isEmailValid
            isFirstNameValid
            isLastNameValid
            isBirthDateValid
            isPasswordValid
            isPasswordConfirmValid
            */



        }

    }

    console.log( "this.model" );
    console.log( this.model );
    this.view = new PageRegisterView( this.model );
    console.log( "this.view" );
    console.log( this.view );

    this.navBar.page = 'register';

};

PageRegisterController.prototype = Object.create( PageBaseController.prototype );
PageRegisterController.prototype.constructor = PageRegisterController;


PageRegisterController.prototype.render = function( onReadyCallback )
{
    console.log( "PageRegisterController.render" );
    var t = this;
    PageBaseController.prototype.render.call( t, function()
    {
        onReadyCallback( t.view.render() );
    } );
};

module.exports = PageRegisterController;
