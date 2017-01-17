define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".error",
        wordings: app.wordings,
        render: function(message) {
            $(this.el).html(Handlebars.templates["error.html"]({
                message: message ? message : this.wordings.errors.default,
                wordings: this.wordings
            })).addClass('error--active');
            $('.error__overlay').addClass('error--active');
        },
        events: {
            "click button": "continue"
        },
        continue: function(e) {
            $(this.el).removeClass('error--active');
            $('.error__overlay').removeClass('error--active');
        },
        errorcallback: function(jqXHR, response) {
            $('.button--disabled').removeClass('button--disabled');
            var param = response.responseJSON ? response.responseJSON.error : jqXHR.responseJSON.error;
            var status = response.status ? response.status : jqXHR.status;
            var message = app.wordings.errors[param] ? app.wordings.errors[param] : app.wordings.errors.http[status];
            this.render(message);
        }
    });
});