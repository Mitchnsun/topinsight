app.homeview = Backbone.View.extend({
    el: ".app",
    initialize: function() {
        console.log('homeview initialize');
        this.render();
    },
    render: function() {
        $(this.el).html(Handlebars.templates["home.html"]());
    }
});