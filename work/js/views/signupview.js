define(['backbone', 'models/vae'], function(Backbone, Vae) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            this.suite = window.location.hash.match(/suite/) !== null ? true : false;
            this.tmpl = this.suite ? Handlebars.templates["signup-suite.html"] : Handlebars.templates["signup.html"];
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.title,
                back: true
            });
            this.render();
        },
        render: function() {
            $(this.el).html(this.tmpl({
                wordings: this.wordings,
                user: app.subscribe.toJSON(),
                urls: app.urls
            }));
        },
        events: {
            "click .button--submit": "submit"
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
                app.subscribe.save();
            }
        }
    });
});