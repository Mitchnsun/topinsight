define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: "header",
        initialize: function() {
            console.log('headerview initialize');
        },
        render: function(options) {
            $(this.el).html(Handlebars.templates["header.html"]({
                title: options.title
            }));
        },
        events: {
            "click .chevron--right": "doing",
            "click .chevron--left": "doing",
            "click .icon--logout": "doing"
        },
        doing: function(e) {
            console.log(e);
        }
    });
});