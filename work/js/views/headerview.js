app.headerview = Backbone.View.extend({
    el: "header",
    initialize: function() {
        console.log('headerview initialize');
        this.render();
    },
    render: function() {
        $(this.el).html(Handlebars.templates["header.html"]({
            title: "Header"
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