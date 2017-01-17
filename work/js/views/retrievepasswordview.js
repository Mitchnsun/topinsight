define(['backbone', 'models/login'], function(Backbone, Login) {
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
            $(this.el).html(Handlebars.templates["retrievepassword.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
        },
        events: {
            "click .button--submit:not(.button--disabled)": "submit"
        },
        submit: function(e) {
            e.preventDefault();
            var token = $('.input__element--token').val();
            this.password = $('.input__element--password1').val();
            var password2 = $('.input__element--password2').val();
            var data = {
                "new": {
                    first: this.password,
                    second: password2
                }
            }

            if (this.checking(token, this.password, password2)) {
                $(e.currentTarget).addClass('button--disabled');
                $.ajax({
                    url: app.urls.endpoint + app.urls.ws_retrievepassword + token,
                    type: 'POST',
                    data: data,
                    success: _.bind(this.success, this),
                    error: _.bind(app.errorview.errorcallback, app.errorview)
                })
            }
        },
        checking: function(token, password1, password2) {
            if (token === "" || password1 === "" || password2 === "") {
                app.errorview.render(app.wordings.errors.empty);
                return false;
            }

            if (!app.rules.user.password(password1)) {
                app.errorview.render(app.wordings.errors.password);
                return false;
            }

            if (password1 !== password2) {
                app.errorview.render(app.wordings.errors.same_password);
                return false;
            }

            return true;
        },
        success: function(msg) {
            this.login = new Login();
            this.login.set({
                email: app.user.get('email'),
                password: this.password
            })
            this.login.save({}, {
                success: this.login.loged,
                error: this.errorlogin
            });
        },
        errorlogin: function() {
            $('.button--disabled').removeClass('button--disabled');
            app.router.navigate(app.urls.signin, { trigger: true });
        }
    });
});