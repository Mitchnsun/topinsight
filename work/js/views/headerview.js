define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: "header",
        render: function(options) {
            if (options.hidden) {
                $(this.el).hide();
                return;
            }
            $(this.el).html(Handlebars.templates["header.html"]({
                urls: app.urls,
                title: options.title,
                back: options.back,
                forward: options.forward,
                signout: options.signout
            })).show();

            if (options.shadow) {
                $(this.el).addClass('shadow');
            } else {
                $(this.el).removeClass('shadow');
            }

            if (options.fixed) {
                $(this.el).addClass('fixed');
            } else {
                $(this.el).removeClass('fixed');
            }
        },
        events: {
            "click .chevron--left": "back",
            "click .icon--signout": "signout"
        },
        signout: function(e) {
            e.preventDefault();
            app.popupview.confirm(true, app.wordings.sign.signout, this.signoutconfirmed);
        },
        signoutconfirmed: function() {
            app.user.clear();
            app.accessToken.clean();
            app.bluetooth.clean();
            facebookConnectPlugin.logout();
            app.router.navigate(app.urls.signin, { trigger: true });
        },
        back: function(e) {
            e.preventDefault();
            window.history.back();
        }
    });
});