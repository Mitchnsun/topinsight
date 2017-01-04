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
        }
    },
    paths: {
        jquery: '../vendors/jquery',
        underscore: '../vendors/underscore',
        backbone: '../vendors/backbone',
        async: '../vendors/async'
    }
});

require([
    'backbone',
    'router',
    'views/errorview',
    'models/user',
    'models/course',
    'models/vae'
], function(Backbone, Router, Errorview, User, Course, Vae) {
    app.$ = $;
    app.user = new User();
    app.course = new Course();
    app.vae = new Vae({ access_token: app.accessToken.get() });
    app.errorview = new Errorview();

    app.user.fetch({
        data: $.param({ access_token: app.accessToken.get() }),
        success: function() {
            // Initialize routing and start Backbone.history()
            app.router = new Router();
            Backbone.history.start();
        },
        error: function() {
            // Initialize routing and start Backbone.history()
            app.router = new Router();
            Backbone.history.start();
        }
    })
});