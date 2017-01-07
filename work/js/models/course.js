define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: function() {
            return app.urls.endpoint + app.urls.ws_course + this.id + '?access_token=' + app.accessToken.get();
        },
        updating: function() {
            app.course.save({
                latitudeEnd: "48.9",
                longitudeEnd: "2.4"
            }, {
                patch: true,
                success: function(model, response, options) {
                    console.log(model, response, options);
                },
                error: function(model, response, options) {
                    console.log(model, response, options);
                }
            });
        },
        location: function() {
            return {
                lat: this.get('latitude'),
                lng: this.get('longitude')
            };
        }
    });
});