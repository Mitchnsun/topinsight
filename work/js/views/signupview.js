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
            var self = this;
            var errors = [];
            _.each($('.input__element'), function(input) {
                var param = $(input).attr('data-param');
                var value = $(input).val();
                app.subscribe.set(param, value);
                if (!app.rules.user.verification(param, value)) {
                    errors.push({ input: input, wording: self.wordings.errors[param] })
                }
            });
            if (errors.length > 0) {
                this.displayErrors(errors);
            } else if (!this.suite) {
                app.router.navigate(app.urls.signup_suite, { trigger: true });
            } else {
                app.subscribe.save();
            }
        },
        displayErrors: function(errors) {
            _.each(errors, function(error) {
                $(error.input).addClass('input__element--error');
                $(error.input).after('<p>' + error.wording + '</p>');
            });
        }
    });
});