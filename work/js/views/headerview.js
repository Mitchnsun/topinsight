define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: "header",
        render: function(options) {
            if(options.hidden) {
                $(this.el).hide();
                return;
            }
            $(this.el).html(Handlebars.templates["header.html"]({
                urls: app.urls,
                title: options.title,
                back: options.back,
                forward: options.forward,
                signout: options.signout,
            })).show();
        },
        events: {
            "click .chevron--left": "back",
            "click .icon--logout": "signout"
        },
        signout: function(e) {
            console.log("signout");
        },
        back: function(e) {
            e.preventDefault();
            window.history.back();
        }
    });
});