define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: app.urls.endpoint + app.urls.ws_user
    });
});