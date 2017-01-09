var app = app || {};

(function($) {
    'use strict';
    app.geolocation = {
        route: [],
        start_date: Date.now(),
        init: function() {
            backgroundGeolocation.configure(_.bind(this.success, this), _.bind(this.failure, this), {
                desiredAccuracy: 10,
                stationaryRadius: 1,
                distanceFilter: 5,
                interval: 2000,
                saveBatteryOnBackground: true,
                maxLocations: 50000
            });

            backgroundGeolocation.start();
        },
        reset: function() {
            app.course.clear();
            clearInterval(this.intervalLocationsId);
            clearInterval(this.intervalSaveId);
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
        start: function() {
            this.getlocations();
            this.intervalLocationsId = setInterval(_.bind(this.getlocations, this), 1000);
            this.intervalSaveId = setInterval(_.bind(this.saveCourse, this), 10000);
        },
        getlocations: function() {
            backgroundGeolocation.getValidLocations(_.bind(this.getlocationscallback, this), this.failure);
        },
        getlocationscallback: function(locations) {
            var self = this;
            this.route.reset(locations);
            // Remove older stored location
            this.route.remove(this.route.filter(function(point) { return point.get('time') < self.start_date; }));
            this.route.trigger('updated');
        },
        saveCourse: function() {
            if (this.route.length === 0) {
                return false;
            }
            var firstLocation = this.route.first();
            var lastLocation = this.route.last();
            app.course.calcDuration(firstLocation, lastLocation)

            if (!app.course.get('id')) {
                this.saveFirstLocation(firstLocation);
            }
            this.saveLastLocation(lastLocation);
        },
        saveFirstLocation: function(model) {
            if (!model) {
                return false;
            }
            app.course.url = app.urls.endpoint + app.urls.ws_course + "?access_token=" + app.accessToken.get();
            app.course.save({
                latitudeStart: model.get('latitude'),
                longitudeStart: model.get('longitude')
            });
        },
        saveLastLocation: function(model) {
            if (!model) {
                return false;
            }
            app.course.url = app.urls.endpoint + app.urls.ws_course + '/' + app.course.get('id') + "?access_token=" + app.accessToken.get();
            app.course.save({
                latitudeEnd: model.get('latitude'),
                longitudeEnd: model.get('longitude'),
                speed: 22.6,
                distance: 13.7,
                assistance: 2
            }, { patch: true });
        }
    };
})();