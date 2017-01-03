define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: app.urls.endpoint + app.urls.ws_vae,
        initialize: function(options) {
            this.fetch({
                access_token: options.access_token
            }, {
                success: _.bind(this.success, this),
                error: _.bind(this.error, this)
            });
        },
        success: function(model, response, options) {
            console.log(model, response, options);
        },
        error: function(model, response, options) {
            console.log(model, response, options);
        }
    });
});