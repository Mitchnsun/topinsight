define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: function() {
            return app.urls.endpoint + app.urls.ws_course + this.id + '?access_token=' + app.accessToken.get();
        },
        initialize: function() {
            this.set('lat', this.get('latitude'));
            this.set('lng', this.get('longitude'));
        },
        location: function() {
            return {
                lat: parseFloat(this.get('latitude')),
                lng: parseFloat(this.get('longitude'))
            };
        }
    });
});