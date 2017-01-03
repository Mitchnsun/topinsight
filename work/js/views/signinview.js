define(['backbone', 'models/subscribe'], function(Backbone, Subscribe) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                hidden: true
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["signin.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
        },
        events: {
            "click .button--submit": "submit",
            "click .button--facebook": "facebook",
            "click .button--signup": "signup"
        },
        submit: function(e) {
            console.log(e);
        },
        facebook: function(e) {
            e.preventDefault();
        },
        signup: function(e) {
            app.subscribe = new Subscribe();
        }
    });
});