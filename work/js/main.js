// Require.js allows us to configure shortcut alias
require.config({
    // The shim config allows us to configure dependencies for
    // scripts that do not call define() to register a module
    shim: {
        underscore: {
            exports: '_'
        },
        backbone: {
            deps: [
                'underscore',
                'jquery'
            ],
            exports: 'Backbone'
        },
        'facebook': {
            exports: 'FB'
        }
    },
    paths: {
        jquery: '../vendors/jquery',
        underscore: '../vendors/underscore',
        backbone: '../vendors/backbone',
        async: '../vendors/async',
        facebook: 'https://connect.facebook.net/en_US/sdk'
    }
});

require([
    'backbone',
    'router',
    'views/errorview',
    'models/user',
    'models/course',
    'models/vae',
    'facebook'
], function(Backbone, Router, Errorview, User, Course, Vae) {
    app.$ = $;
    app.user = new User();
    app.course = new Course();
    app.vae = new Vae();
    app.errorview = new Errorview();

    FB.init({
        appId: app.wordings.FBApiID,
        version: 'v2.4'
    });

    var initRouter = function() {
        // Initialize routing and start Backbone.history()
        app.router = new Router();
        Backbone.history.start();
    };

    if (app.accessToken.get()) {
        app.user.fetch({
            data: $.param({ access_token: app.accessToken.get() }),
            success: initRouter,
            error: initRouter
        });
    } else {
        initRouter();
    }
});