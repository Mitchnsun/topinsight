var app = app || {};

(function($) {
    'use strict';
    app.bluetooth = {
        params: {},
        bytesToString: function(buffer) {
            return String.fromCharCode.apply(null, new Uint8Array(buffer));
        },
        stringToBytes: function(string) {
            var array = new Uint8Array(string.length);
            for (var i = 0, l = string.length; i < l; i++) {
                array[i] = string.charCodeAt(i);
            }
            return array.buffer;
        },
        /* Global functions */
        clean: function() {
            this.disconnect();
            this.params.clean();
        },
        error: function(path, msg) {
            console.log('# ERROR ', path, msg)
            app.popupview.render(app.wordings.errors.bluetooth);
        },
        success: function(msg) {
            console.log('#SUCCESS ', msg);
        },
        /* initialize */
        init: function(success, failure) {
            console.log('- bluetooth init -');
            ble.isConnected(this.params.get('address'), success, failure);
        },
        isenabled: function(msg) {
            console.log('- enable bluetooth - ');
            ble.isEnabled(_.bind(this.ready, this), _.bind(this.enable, this));
        },
        enable: function() {
            ble.enable(_.bind(this.ready, this), _.bind(this.error, this));
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
            console.log('startScanSuccess', device);
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
            console.log('- connectsuccess - ', msg);
            this.params.trigger('ready');
            //this.read();
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
            console.log('- start notification -');
            ble.startNotification(this.params.get('address'), "0000fff0-0000-1000-8000-00805f9b34fb", "0000fff1-0000-1000-8000-00805f9b34fb",
                _.bind(this.notificationsuccess, this), _.bind(this.notificationerror, this));
        },
        notificationsuccess: function(msg) {
            console.log('- notificationsuccess - ', msg, new Uint8Array(msg), this.bytesToString(msg));
        },
        notificationerror: function(msg) {
            console.log('- notificationerror - ', msg);
        },
        read: function() {
            ble.read(this.params.get('address'), "0000fff0-0000-1000-8000-00805f9b34fb", "0000fff1-0000-1000-8000-00805f9b34fb", this.readsuccess, this.error);
        },
        readsuccess: function(msg) {
            console.log('- readsuccess - ', msg, JSON.stringify(msg), new Uint8Array(msg));
        },
        /* Write */
        write: function() {
            var value = new Uint8Array([86, 1, 1, 1, 12, 7, 0, 8, 0, 10, 3, 0, 0, 0]);
            console.log(value);
            ble.write(this.params.get('address'), "0000fff0-0000-1000-8000-00805f9b34fb", "0000fff1-0000-1000-8000-00805f9b34fb", value.buffer, this.writesuccess, this.writeerror);
        },
        writesuccess: function(msg) {
            console.log('- writesuccess - ', msg, new Uint8Array(msg));
        },
        writeerror: function(msg) {
            console.log('- writeerror - ', msg);
        }
    };
})();