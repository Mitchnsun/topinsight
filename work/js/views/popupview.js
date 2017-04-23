define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".popup",
        wordings: app.wordings,
        initialize: function() {
            this.callbacks = {};
            $(window).on('popstate', _.bind(this.popstate, this));
        },
        render: function(message) {
            $(this.el).html(Handlebars.templates["popup.html"]({
                message: message ? message : this.wordings.errors.default,
                wordings: this.wordings
            })).addClass('popup--active');
            $('.popup').addClass('popup--active');
            window.history.pushState({}, 'Pop up', '#' + app.urls.popup);
        },
        confirm: function(type, message, yescallback, cancelcallback) {
            $(this.el).html(Handlebars.templates["popup.html"]({
                confirm: type,
                message: message,
                wordings: this.wordings
            })).addClass('popup--active');
            $('.popup__overlay').addClass('popup--active');
            this.callbacks.yes = yescallback;
            this.callbacks.cancel = cancelcallback;
            window.history.pushState({}, 'Pop up', '#' + app.urls.popup);
        },
        events: {
            "click button": "action"
        },
        action: function(e) {
            $(this.el).removeClass('popup--active');
            $('.popup__overlay').removeClass('popup--active');

            var action = $(e.currentTarget).attr('data-action');
            if (action === 'yes' && this.callbacks.yes) {
                this.callbacks.yes();
            } else if (action === 'cancel' && this.callbacks.cancel) {
                this.callbacks.cancel();
            } else {
                this.continue();
            }

            this.callbacks = {};
        },
        continue: function() {
            $(this.el).removeClass('popup--active');
            $('.popup__overlay').removeClass('popup--active');
            if (window.location.hash === '#' + app.urls.popup) {
                window.history.back();
            }
        },
        popstate: function(e) {
            if ($(this.el).hasClass('popup--active') || window.location.hash === '#' + app.urls.popup) {
                this.continue();
            }
        },
        errorcallback: function(jqXHR, response) {
            $('.button--disabled').removeClass('button--disabled');
            var param = response.responseJSON ? response.responseJSON.error : jqXHR.responseJSON.error;
            var status = response.status ? response.status : jqXHR.status;
            var message = app.wordings.errors[param] ? app.wordings.errors[param] : app.wordings.errors.http[status];
            this.render(message);
        }
    });
});