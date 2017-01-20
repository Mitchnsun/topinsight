define(['backbone', 'models/vae', 'models/subscribe'], function(Backbone, Vae, Subscribe) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            if (app.accessToken.get()) {
                app.router.navigate(app.urls.home, { trigger: true });
                return false;
            }

            this.suite = window.location.hash.match(/suite/) !== null ? true : false;
            this.tmpl = this.suite ? Handlebars.templates["signup-suite.html"] : Handlebars.templates["signup.html"];
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.title,
                back: true
            });
            app.subscribe = app.subscribe ? app.subscribe : new Subscribe();
            this.render();
        },
        render: function() {
            $(this.el).html(this.tmpl({
                wordings: this.wordings,
                user: app.subscribe.toJSON(),
                urls: app.urls,
                vae: app.vae.toJSON()
            }));
            app.hack.form();
        },
        events: {
            "click .button--submit:not(.button--disabled)": "submit"
        },
        submit: function(e) {
            e.preventDefault();
            app.subscribe.set(app.rules.user.verification($('.input__element')));
            var subscribe = app.subscribe.toJSON();
            if (subscribe.empty) {
                app.errorview.render(subscribe.empty);
                app.subscribe.unset('empty');
            } else if (subscribe.errors) {
                app.errorview.render(_.first(subscribe.errors));
                app.subscribe.unset('errors');
            } else if (!this.suite) {
                app.router.navigate(app.urls.signup_suite, { trigger: true });
            } else {
                $(e.currentTarget).addClass('button--disabled');
                app.subscribe.save({}, {
                    success: _.bind(this.success, this),
                    error: _.bind(app.errorview.errorcallback, app.errorview)
                });
            }
        },
        success: function(model, response, options) {
            $('.button--disabled').removeClass('button--disabled');
            app.user.set(model.get('user'));
            app.accessToken.set(model.get('access_token'));
            app.router.navigate(app.urls.home, { trigger: true });
        }
    });
});