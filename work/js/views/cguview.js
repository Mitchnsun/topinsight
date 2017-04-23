define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.cgu,
        initialize: function(options) {
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.title,
                back: true,
                fixed: true
            });
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["cgu.html"]({
                wordings: this.wordings,
                urls: app.urls
            }));
        }
    });
});