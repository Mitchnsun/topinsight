var app = app || {};

(function($) {
    'use strict';
    app.bluetooth = {
        params: {},
        /* Global functions */
        clean: function() {
            this.disconnect();
            this.params.clean();
        },
        error: function(path, msg) {
            console.log('# ERROR ', path, msg)
            app.errorview.render(app.wordings.errors.bluetooth);
        },
        success: function(msg) {
            console.log('#SUCCESS ', msg);
        },
        /* initialize */
        init: function(success, failure) {
            console.log('- bluetooth init -');
            ble.isEnabled(success, failure);
        },
        enable: function(msg) {
            console.log('- enable bluetooth - ');
            // Bluetooth not yet enabled so we try to enable it
            ble.enable(_.bind(this.ready, this), this.error);
        },
        ready: function(msg) {
            console.log('- ready bluetooth - ');
            if (this.params.get('address')) {
                this.connect();
            } else {
                ble.startScan([], _.bind(this.startScanSuccess, this), _.bind(this.startScanError, this));
                setTimeout(_.bind(this.stopscan, this), 15000);
            }
        },
        /* Scan */
        startScanSuccess: function(device) {
            if (device.name === this.params.get('name')) {
                this.params.set('address', device.id);
                this.stopscan();
                this.connect();
                console.log('- startScanSuccess - ', JSON.stringify(device));
            }
        },
        startScanError: function(msg) {
            this.error('- startScanError - ', msg);
            this.stopscan();
        },
        stopscan: function() {
            ble.stopScan(_.bind(this.stopScanSuccess, this), this.error);
        },
        stopScanSuccess: function(msg) {
            console.log('- stopScanSuccess - ', msg);
        },
        /* Connection */
        connect: function() {
            ble.connect(this.params.get('address'), _.bind(this.connectsuccess, this), _.bind(this.connecterror, this));
        },
        connectsuccess: function(msg) {
            console.log('- connectsuccess - ', JSON.stringify(msg));
            this.params.trigger('ready');
            this.read();
            this.notify();
        },
        connecterror: function(msg) {
            console.log('- connecterror -', msg);
            if (msg.errorMessage === "Peripheral Disconnected") {
                app.geolocation.reset();
            }
            ble.startScan([], _.bind(this.startScanSuccess, this), _.bind(this.startScanError, this));
            setTimeout(_.bind(this.stopscan, this), 15000);
        },
        disconnect: function() {
            ble.disconnect(this.params.get('address'), this.success, this.error);
        },
        /* Notifications */
        notify: function() {

            ble.startNotification(this.params.get('address'), "FFF0", "FFF1",
                _.bind(this.notificationsuccess, this), _.bind(this.notificationerror, this));
        },
        notificationsuccess: function(msg) {
            console.log('- notificationsuccess - ', msg, new Uint8Array(msg));
        },
        notificationerror: function(msg) {
            console.log('- notificationerror - ', msg);
        },
        read: function() {
            ble.read(this.params.get('address'), "FFF0", "FFF1", this.readsuccess, this.error);
        },
        readsuccess: function(msg) {
            console.log('- readsuccess - ', msg, JSON.stringify(msg), new Uint8Array(msg));
        },
        /* Write */
        write: function() {
            var value = new Uint8Array(1);
            value[0] = 1;
            console.log(value);
            ble.write(this.params.get('address'), "FFF0", "FFF1", value.buffer, this.writesuccess, this.writeerror);
        },
        writesuccess: function(msg) {
            console.log('- writesuccess - ', msg, new Uint8Array(msg));
        },
        writeerror: function(msg) {
            console.log('- writeerror - ', msg);
        }
    };
})();