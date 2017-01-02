var app = app || {};

(function($) {
    'use strict';
    app.rules = {
        user: {
            verification: function(param, value) {
                return this[param] ? this[param](value) : true;
            },
            firstname: function(value) {
                var rule = new RegExp(/^[a-zA-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F \-]{0,12}[a-zA-Z\u00C0-\u017F]$/);
                return value && rule.test(value);
            },
            lastname: function(value) {
                var rule = new RegExp(/^[a-zA-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F \-]{0,12}[a-zA-Z\u00C0-\u017F]$/);
                return value && rule.test(value);
            },
            email: function(value) {
                var rule = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return value && rule.test(value);
            },
            password: function(value) {
                var rule = new RegExp(/^([\x21-\x7E\u00C0-\u017F]{4,18})$/);
                return value && rule.test(value);
            },
            phone: function(value) {
                var rule = new RegExp(/^(?:(?:\+|00)[0-9]{2,3}|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/);
                return value && rule.test(value);
            }
        }
    };
})();