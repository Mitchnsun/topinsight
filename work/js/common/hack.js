var app = app || {};

(function($) {
    'use strict';
    app.hack = {
        marginBottom: 45,
        windowHeight: 0,
        centerDiff: 0,
        /* Center form et put button--container to bottom */
        form: function(notInput) {
            this.windowHeight = this.windowHeight ? this.windowHeight : app.$(window).height();
            var positionButtons = Math.abs(this.marginBottom - this.windowHeight + app.$('.button--container').height());
            this.centerDiff = Math.ceil(app.$('.button--container').position().top - positionButtons);

            app.$('.button--container').css('bottom', this.centerDiff);
            if (!notInput) {
                app.$('.input').css('bottom', Math.floor(this.centerDiff * 0.5));
            }

            // Check if button--container is not to low
            var gapbottom = this.windowHeight - app.$('.button--container').position().top - app.$('.button--container').height();
            if (gapbottom < this.marginBottom) {
                app.$('.button--container').css('bottom', Math.ceil(this.centerDiff + this.marginBottom - gapbottom));
            }
        },
        /* Hack for iOS when open Facebook. Webview goes under statusbar, we have to reset the property */
        statusbar: function() {
            StatusBar.overlaysWebView(true);
            StatusBar.overlaysWebView(false);
        },
        /* Hack for Android, when the user hitting the GO button */
        nextfield: function(inputs) {
            _.every(inputs, function(input) {
                var value = app.$(input).val();
                if (!value || value == "") {
                    app.$(input).focus();
                    return false;
                }
                return true;
            });
        }
    };
})();