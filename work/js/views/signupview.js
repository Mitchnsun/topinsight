define(['backbone', 'models/vae'], function(Backbone, Vae) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            console.log(app.user.toJSON());
            this.tmpl = window.location.hash.match(/suite/) !== null ? Handlebars.templates["signup-suite.html"] : Handlebars.templates["signup.html"];
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
                urls: app.urls
            }));
        },
        events: {
            "click .button--submit": "submit"
        },
        submit: function(e) {
            var self = this;
            var errors = [];
            _.each($('.input__element'), function(input) {
                var param = $(input).attr('data-param');
                var value = $(input).val();
                app.user.set(param, value);
                if (!app.rules.user.verification(param, value)) {
                    errors.push({ input: input, wording: self.wordings.errors[param] })
                }
            });
            if (errors.length > 0) {
                e.preventDefault();
                this.displayErrors(errors);
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