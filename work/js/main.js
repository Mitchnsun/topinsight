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
    'models/vae'
], function(Backbone, Router, Errorview, User, Vae) {
    app.$ = $;
    app.user = new User();
    app.vae = new Vae({ access_token: "ee57db27c3c9c618d6f8e66b8d46a207585c05e03485a" });
    app.errorview = new Errorview();
    // Initialize routing and start Backbone.history()
    app.router = new Router();
    Backbone.history.start();
});