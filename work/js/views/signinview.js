define(['backbone', 'models/subscribe', 'models/login'], function(Backbone, Subscribe, Login) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            if (app.accessToken.get()) {
                app.router.navigate(app.urls.home, { trigger: true });
                return false;
            }

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
            app.hack.form();
        },
        events: {
            "submit": "signin",
            "click .button--facebook": "facebook",
            "click .button--signup": "signup"
        },
        signin: function(e) {
            e.preventDefault();
            if ($(e.currentTarget).hasClass('button--disabled')) {
                return false;
            }

            this.login = new Login();
            this.login.set(app.rules.user.verification($('.input__element')));
            var login = this.login.toJSON();
            if (/Android/.test(navigator.userAgent) && login.empty) {
                app.hack.nextfield($('.input__element'));
                this.login.unset('empty');
                this.login.unset('errors');
            } else if (login.empty) {
                app.popupview.render(login.empty);
                this.login.unset('empty');
            } else if (login.errors) {
                app.popupview.render(_.first(login.errors));
                this.login.unset('errors');
            } else {
                $(e.currentTarget).addClass('button--disabled');
                this.login.save({}, {
                    success: this.login.loged,
                    error: _.bind(app.popupview.errorcallback, app.popupview)
                });
            }
        },
        facebook: function(e) {
            e.preventDefault();
            if ($(e.currentTarget).hasClass('button--disabled')) {
                return false;
            }
            $(e.currentTarget).addClass('button--disabled');
            facebookConnectPlugin.login(['public_profile', 'email'], _.bind(this.fbcallback, this), function() {
                app.hack.statusbar();
                app.popupview.render(app.wordings.errors.facebook);
                $(e.currentTarget).removeClass('button--disabled');
            });
        },
        fbcallback: function(msg) {
            this.login = new Login();
            app.hack.statusbar();
            $('.button--facebook').removeClass('button--disabled');
            if (msg.status === "connected") {
                this.FBUserID = msg.authResponse.userID;
                this.login.url = app.urls.endpoint + app.urls.ws_fblogin;
                this.login.save({
                    facebook_token: msg.authResponse.accessToken
                }, {
                    success: _.bind(this.signinWithFB, this),
                    error: function() {
                        app.popupview.render(app.wordings.errors.facebook);
                    }
                });
            } else {
                app.popupview.render(app.wordings.errors.facebook);
            }
        },
        signinWithFB: function(model, response, options) {
            if (response && response.user == false) {
                // User does not exist in database
                facebookConnectPlugin.api(this.FBUserID + "/?fields=id,email,name,first_name,last_name", ['public_profile', 'email'],
                    _.bind(this.signupWithFB, this),
                    function() {
                        app.popupview.render(app.wordings.errors.facebook);
                    }
                );
            }
            if (response && response.access_token) {
                this.login.loged(model, response, options);
            }
        },
        signupWithFB: function(msg) {
            app.subscribe = new Subscribe();
            app.subscribe.set({
                facebookUid: msg.id,
                facebookName: msg.name,
                firstname: msg.first_name,
                lastname: msg.last_name,
                email: msg.email
            });
            app.router.navigate(app.urls.signup, { trigger: true });
            app.hack.statusbar();
        },
        signup: function(e) {
            app.subscribe = new Subscribe();
        }
    });
});