define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.dashboard,
        initialize: function() {
            console.log('homeview initialize');
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["home.html"]());
        }
    });
});