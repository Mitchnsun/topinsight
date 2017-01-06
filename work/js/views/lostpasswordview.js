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
        },
        events: {
            "click .button--submit": "submit"
        },
        submit: function(e) {
            e.preventDefault();
            var email = $('.input__element').val();
            app.user.set('email', email);
            if (app.rules.user.email(email)) {
                $.ajax({
                    url: app.urls.endpoint + app.urls.ws_lostpassword.replace('@', email),
                    type: 'PUT',
                    success: _.bind(this.success, this),
                    error: _.bind(app.errorview.errorcallback, app.errorview)
                })
            } else {
                app.errorview.render(app.wordings.errors.email);
            }
        },
        success: function(msg) {
            if (msg.reset === true) {
                app.router.navigate(app.urls.retrieve_password, { trigger: true });
            } else {
                app.errorview.render(app.wordings.errors[msg.error]);
            }
        }
    });
});