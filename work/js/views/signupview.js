define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        initialize: function(options) {
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
        }
    });
});