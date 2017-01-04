define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: app.urls.endpoint + app.urls.ws_vae,
        initialize: function(options) {
            this.fetch({ access_token: options.access_token });
        }
    });
});