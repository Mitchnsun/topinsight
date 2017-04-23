define(['backbone', 'models/login'], function(Backbone, Login) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.password,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.header,
                back: false
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["retrievepassword.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
            app.hack.form();
        },
        events: {
            "submit": "submit",
            "focusout .input__element--token": "trim"
        },
        trim: function(e) {
            var target = $(e.currentTarget);
            target.val(target.val().trim());
        },
        submit: function(e) {
            e.preventDefault();
            if ($(e.currentTarget).hasClass('button--disabled')) {
                return false;
            }

            var token = $('.input__element--token').val();
            this.password = $('.input__element--password1').val();
            var password2 = $('.input__element--password2').val();
            var data = {
                "new": {
                    first: this.password,
                    second: password2
                }
            }

            if (/Android/.test(navigator.userAgent) && (token === "" || this.password === "" || password2 === "")) {
                app.hack.nextfield($('.input__element'));
            } else if (this.checking(token, this.password, password2)) {
                $(e.currentTarget).addClass('button--disabled');
                $.ajax({
                    url: app.urls.endpoint + app.urls.ws_retrievepassword + token.trim(),
                    type: 'POST',
                    data: data,
                    success: _.bind(this.success, this),
                    error: _.bind(app.popupview.errorcallback, app.popupview)
                })
            }
        },
        checking: function(token, password1, password2) {
            if (token === "" || password1 === "" || password2 === "") {
                app.popupview.render(app.wordings.errors.empty);
                return false;
            }

            if (!app.rules.user.password(password1)) {
                app.popupview.render(app.wordings.errors.password);
                return false;
            }

            if (password1 !== password2) {
                app.popupview.render(app.wordings.errors.same_password);
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