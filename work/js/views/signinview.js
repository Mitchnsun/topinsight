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
            var email = $('.input__element--email').val();
            if (app.rules.user.email(email)) {
                this.login.set({
                    email: email,
                    password: $('.input__element--password').val()
                });
                this.login.save();
            }
        },
        facebook: function(e) {
            e.preventDefault();
        },
        signup: function(e) {
            app.subscribe = new Subscribe();
        }
    });
});