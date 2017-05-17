define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.title,
                back: false
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["emailverification.html"]({
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

            var code = $('.input__element').val().trim();
            if (code && code !== "") {
                $(e.currentTarget).addClass('button--disabled');
                $.ajax({
                    url: app.urls.endpoint + app.urls.ws_checkemail.replace('@', app.user.get('email')) + code,
                    type: 'PUT',
                    success: _.bind(this.success, this),
                    error: _.bind(app.popupview.errorcallback, app.popupview)
                });
            } else {
                app.popupview.render(app.wordings.errors.empty);
            }
        },
        success: function(msg) {
            $('.button--disabled').removeClass('button--disabled');
            if (msg.access_token) {
                app.accessToken.set(msg.access_token);
                app.user.set(msg.user);
                app.bluetooth.params.initStatus(msg.user.vae_type);
                app.router.navigate(app.urls.home, { trigger: true });
            } else {
                app.popupview.render(app.wordings.errors[msg.error]);
            }
        }
    });
});