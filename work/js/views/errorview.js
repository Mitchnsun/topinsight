define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".error",
        wordings: app.wordings,
        render: function(message) {
            $(this.el).html(Handlebars.templates["error.html"]({
                message: message ? message : this.wordings.errors.default,
                wordings: this.wordings
            })).addClass('error--active');
        },
        events: {
            "click button": "continue"
        },
        continue: function(e) {
            $(this.el).removeClass('error--active');
        },
        errorcallback: function(model, response, options) {
            var param = response.responseJSON.error;
            var message = app.wordings.errors[param] ? app.wordings.errors[param] : app.wordings.errors.http[response.status];
            this.render(message);
        }
    });
});