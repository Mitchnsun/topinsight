define(['backbone'], function(Backbone) {
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
            "click .button--twitter": "twitter"
        },
        submit: function(e) {
            console.log(e);
        },
        facebook: function(e) {
            e.preventDefault();
        },
        twitter: function(e) {
            console.log(e);
        }
    });
});