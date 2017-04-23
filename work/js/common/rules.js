var app = app || {};

(function($) {
    'use strict';
    app.rules = {
        user: {
            verification: function(inputs) {
                var self = this;
                var data = { errors: [] };
                _.each(inputs, function(input) {
                    var param = app.$(input).attr('data-param');
                    var value = app.$(input).val();
                    var is_error = self[param] ? !self[param](value) : false;
                    data[param] = value;

                    if (!value || value == "") {
                        data.empty = app.wordings.errors.empty;
                    }
                    if (is_error) {
                        data.errors.push(app.wordings.errors[param]);
                    }
                });
                if (data.errors.length == 0) {
                    delete data.errors;
                }
                return data;
            },
            firstname: function(value) {
                var rule = new RegExp(/^[a-zA-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F \-]{0,12}[a-zA-Z\u00C0-\u017F]$/);
                return rule.test(value);
            },
            lastname: function(value) {
                var rule = new RegExp(/^[a-zA-Z\u00C0-\u017F][a-zA-Z\u00C0-\u017F \-]{0,12}[a-zA-Z\u00C0-\u017F]$/);
                return rule.test(value);
            },
            email: function(value) {
                var rule = new RegExp(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
                return rule.test(value);
            },
            password: function(value) {
                var rule = new RegExp(/^([\x21-\x7E\u00C0-\u017F]{4,18})$/);
                return rule.test(value);
            },
            phone: function(value) {
                var rule = new RegExp(/^(?:(?:\+|00)[0-9]{2,3}|0)*[1-9](?:\d{2}){4}$/);
                return rule.test(value);
            }
        }
    };
})();