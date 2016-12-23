define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.dashboard,
        initialize: function() {
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["home.html"]({
                wordings: this.wordings
            }));
        }
    });
});