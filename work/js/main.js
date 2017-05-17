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
    waitSeconds: 30,
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
    'views/popupview',
    'models/user',
    'models/bluetoothparams',
    'models/course',
    'models/vae'
], function(Backbone, Router, Popupview, User, BluetoothParams, Course, Vae) {
    app.$ = $;
    app.user = new User();
    app.course = new Course();
    app.vae = new Vae();
    app.popupview = new Popupview();
    app.bluetooth.params = new BluetoothParams();

    document.addEventListener("backbutton", app.backbutton, false);
    // deviceready Event Handler

    // Launch app from external link 
    // Just launch the app, the app can't display a previous activity
    /*universalLinks.subscribe('openItinaryView', function(event) {
        console.log("openItinaryView", event);
        var urlData = event ? event.detail : {};
        alert('Did launch application from the link: ' + urlData.url)
    });*/

    var initRouter = function(d) {
        // Initialize routing and start Backbone.history()
        app.bluetooth.params.initStatus(d.get('user').vae_type);
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
        app.router = new Router();
        Backbone.history.start();
    }
});