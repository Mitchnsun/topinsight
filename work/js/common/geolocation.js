var app = app || {};

(function($) {
    'use strict';
    app.geolocation = {
        route: {},
        init: function() {
            backgroundGeolocation.configure(_.bind(this.success, this), _.bind(this.failure, this), {
                desiredAccuracy: 10,
                stationaryRadius: 1,
                distanceFilter: 1,
                interval: 500,
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
            this.route.add(locations);
        }
    };
})();