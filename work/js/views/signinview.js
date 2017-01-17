define(['backbone', 'models/subscribe', 'models/login'], function(Backbone, Subscribe, Login) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                hidden: true
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["signin.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
        },
        events: {
            "click .button--signin:not(.button--disabled)": "signin",
            "click .button--facebook": "facebook",
            "click .button--signup": "signup"
        },
        signin: function(e) {
            e.preventDefault();
            this.login = new Login();
            this.login.set(app.rules.user.verification($('.input__element')));
            var login = this.login.toJSON();
            if (login.empty) {
                app.errorview.render(login.empty);
                this.login.unset('empty');
            } else if (login.errors) {
                app.errorview.render(_.first(login.errors));
                this.login.unset('errors');
            } else {
                $(e.currentTarget).addClass('button--disabled');
                this.login.save({}, {
                    success: this.login.loged,
                    error: _.bind(app.errorview.errorcallback, app.errorview)
                });
            }
        },
        facebook: function(e) {
            e.preventDefault();
            FB.login(_.bind(this.fbcallback, this), { scope: 'public_profile,email' });
        },
        fbcallback: function(msg) {
            this.login = new Login();
            if (msg.status === "connected") {
                this.login.url = app.urls.endpoint + app.urls.ws_fblogin;
                this.login.save({
                    facebook_token: msg.authResponse.accessToken
                }, {
                    success: this.login.loged,
                    error: function() {
                        app.errorview.render(app.wordings.errors.facebook);
                    }
                });
            } else {
                app.errorview.render(app.wordings.errors.facebook);
            }
        },
        signup: function(e) {
            app.subscribe = new Subscribe();
        }
    });
});