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
        }
    };
})();