var app = app || {};

(function($) {
    'use strict';
    app.bluetooth = {
        params: {},
        init: function(params) {
            this.params = params;
            try {
                console.log(bluetoothle, params.toJSON());
                bluetoothle.initialize(_.bind(this.initcallback, this), this.params.get('init'));
            } catch (e) {
                this.error('- init - ', e);
            }
        },
        initcallback: function(msg) {
            if (msg.status === "enabled") {
                bluetoothle.startScan(_.bind(this.startScanSuccess, this), _.bind(this.startScanError, this), this.params.get('scan'));
            } else {
                this.error('- initcallback - ', msg);
            }
        },
        error: function(path, msg) {
            console.log(path, msg)
            app.errorview.render(app.wordings.errors.bluetooth);
        },
        /* Scan */
        startScanSuccess: function(msg) {
            console.log('- startScanSuccess - ', msg);
            this.stopscan();
        },
        startScanError: function(msg) {
            this.error('- startScanError - ', msg);
        },
        stopscan: function() {
            bluetoothle.stopScan(_.bind(this.stopScanSuccess, this));
        },
        stopScanSuccess: function(msg) {
            console.log('- stopScanSuccess - ', msg);
        }
    };
})();