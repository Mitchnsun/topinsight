var app = app || {};

(function($) {
    'use strict';
    app.accessToken = {
        storage: function(key, value) {
            if (!localStorage) {
                return false;
            }
            if (value === undefined) {
                return localStorage.getItem(key);
            } else {
                localStorage.setItem(key, value);
            }
        },
        set: function(token) {
            this.storage('token', token);
        },
        get: function() {
            return this.storage('token');
        },
        clean: function() {
            localStorage.removeItem('token');
        }
    };
})();