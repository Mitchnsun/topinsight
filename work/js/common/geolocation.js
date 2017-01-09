var app = app || {};

(function($) {
    'use strict';
    app.geolocation = {
        route: {},
        start_date: Date.now(),
        init: function() {
            backgroundGeolocation.configure(_.bind(this.success, this), _.bind(this.failure, this), {
                desiredAccuracy: 10,
                stationaryRadius: 1,
                distanceFilter: 5,
                interval: 2000,
                saveBatteryOnBackground: true
            });

            backgroundGeolocation.start();
        },
        reset: function() {
            backgroundGeolocation.deleteAllLocations(this.success, this.failure);
        },
        stop: function() {
            backgroundGeolocation.stop();
        },
        success: function(msg) {
            console.log(msg);
        },
        failure: function(msg) {
            console.log(msg);
        },
        getlocations: function() {
            backgroundGeolocation.getLocations(_.bind(this.getlocationscallback, this), this.failure);
        },
        getlocationscallback: function(locations) {
            var self = this;
            console.log("Stored locations - ", locations.length);
            this.route.reset(locations);
            // Remove older stored location
            this.route.remove(this.route.filter(function(point) { return point.get('time') < self.start_date; }));
            this.route.trigger('updated');
            this.saveCourse();
        },
        saveCourse: function() {
            var firstLocation = this.route.first();
            var lastLocation = this.route.last();
            app.course.setDuration(firstLocation, lastLocation)

            if (!app.course.get('id')) {
                this.saveFirstLocation(firstLocation);
            }
            this.saveLastLocation(lastLocation);
        },
        saveFirstLocation: function(model) {
            console.log(model.toJSON());
            app.course.url = app.urls.endpoint + app.urls.ws_course + "?access_token=" + app.accessToken.get();
            app.course.save({
                latitudeStart: model.get('latitude'),
                longitudeStart: model.get('longitude')
            }, {
                success: function(model, response, options) {
                    console.log(model, response, options);
                },
                error: function(model, response, options) {
                    console.log(model, response, options);
                }
            });
        },
        saveLastLocation: function(model) {
            console.log(model.toJSON());
            app.course.url = app.urls.endpoint + app.urls.ws_course + '/' + app.course.get('id') + "?access_token=" + app.accessToken.get();
            app.course.save({
                latitudeEnd: model.get('latitude'),
                longitudeEnd: model.get('longitude')
            }, {
                patch: true,
                success: function(model, response, options) {
                    console.log(model, response, options);
                },
                error: function(model, response, options) {
                    console.log(model, response, options);
                }
            });
        }
    };
})();