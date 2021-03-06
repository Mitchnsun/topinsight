define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.password,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.header,
                back: true
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["lostpassword.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
            app.hack.form(true);
        },
        events: {
            "submit": "submit"
        },
        submit: function(e) {
            e.preventDefault();
            if ($(e.currentTarget).hasClass('button--disabled')) {
                return false;
            }

            var email = $('.input__element').val().trim();
            app.user.set('email', email);
            if (app.rules.user.email(email)) {
                $(e.currentTarget).addClass('button--disabled');
                $.ajax({
                    url: app.urls.endpoint + app.urls.ws_lostpassword.replace('@', email),
                    type: 'PUT',
                    success: _.bind(this.success, this),
                    error: _.bind(app.popupview.errorcallback, app.popupview)
                });
            } else {
                app.popupview.render(app.wordings.errors.email);
            }
        },
        success: function(msg) {
            $('.button--disabled').removeClass('button--disabled');
            if (msg.reset === true) {
                app.router.navigate(app.urls.retrieve_password, { trigger: true });
            } else {
                app.popupview.render(app.wordings.errors[msg.error]);
            }
        }
    });
});