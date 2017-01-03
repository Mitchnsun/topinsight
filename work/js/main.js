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
    'models/user'
], function(Backbone, Router, User) {
    // Initialize routing and start Backbone.history()
    app.user = new User();
    app.router = new Router();
    Backbone.history.start();
});