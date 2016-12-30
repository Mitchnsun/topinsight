define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.itinerary,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.header,
                back: true
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["itinerary.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
        }
    });
});