var app = app || {};

(function($) {
    'use strict';
    app.backbutton = function(e) {
        var noBackUrl = [app.urls.home, app.urls.signin, app.urls.signup_verif, app.urls.retrieve_password];
        if (_.indexOf(noBackUrl, window.location.hash.substr(1)) === -1) {
            window.history.back();
        }
    };
})();