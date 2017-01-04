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
        get: function(key) {
            return this.storage(key);
        },
        clean: function() {
            this.localStorage.removeItem('token');
        }
    };
})();