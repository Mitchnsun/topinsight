define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.dashboard,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.header,
                back: false,
                forward: true,
                signout: true,
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["home.html"]({
                wordings: this.wordings
            }));
        }
    });
});