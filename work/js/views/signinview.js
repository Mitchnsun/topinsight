define(['backbone', 'models/subscribe', 'models/login'], function(Backbone, Subscribe, Login) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                hidden: true
            });
            this.login = new Login();
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["signin.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
        },
        events: {
            "click .button--signin": "signin",
            "click .button--facebook": "facebook",
            "click .button--signup": "signup"
        },
        signin: function(e) {
            e.preventDefault();
            this.login.set(app.rules.user.verification($('.input__element')));
            var login = this.login.toJSON();
            if (login.empty) {
                app.errorview.render(login.empty);
                this.login.unset('empty');
            } else if (login.errors) {
                app.errorview.render(_.first(login.errors));
                this.login.unset('errors');
            } else {
                this.login.save({}, {
                    success: _.bind(this.success, this),
                    error: _.bind(app.errorview.errorcallback, app.errorview)
                });
            }
        },
        success: function(model, response, options) {
            console.log(model, response, options);
        },
        facebook: function(e) {
            e.preventDefault();
        },
        signup: function(e) {
            app.subscribe = new Subscribe();
        }
    });
});