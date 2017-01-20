var app = app || {};

(function($) {
    'use strict';
    app.hack = {
        /* Center form et put button--container to bottom */
        form: function() {
            var windowHeight = app.$(window).height();
            var bottom = windowHeight - app.$('.button--container').height() - app.$('.button--container').position().top;
            var diff = Math.ceil(windowHeight * 0.05 - bottom);
            app.$('.button--container').css('bottom', diff);
            app.$('.input').css('bottom', Math.floor(diff * 0.5));
        }
    };
})();