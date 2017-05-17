var app = app || {};

(function($) {
    'use strict';
    app.bluetooth = {
        params: {},
        /* API */
        isConnected: function(success, failure) {
            ble.isConnected(this.params.get('device'), success, failure);
        },
        clean: function() {
            this.disconnect();
            this.params.clean();
        },
        enable: function() {
            if (this.params.get('connected') === true) return;
            var _this = this;
            ble.isEnabled(
                function() {
                    console.log('BLE scanning...');
                    ble.scan(
                        [],
                        30,
                        function(d) {
                            console.log('BLE found',!(d.name !== _this.params.get('name')));
                            if (d.name !== _this.params.get('name')) return;
                            _this.connect(d);
                        },
                        function(e) {
                            console.error('failed scan',e)
                        });
                },
                function() {
                    app.popupview.render(app.wordings.errors.bluetooth);
                    console.error('Bluetooth not enabled on device');
                });
        },
        /* Internals */
        disconnect: function(success, failure) {
            if (this.params.get('connected') !== true) return;
            ble.disconnect(this.params.get('device').id, success, failure);
        },
        connect: function(device) {
            var _this = this;
            console.log('BLE connecting to',device);
            ble.connect(
                device.id, 
                function(d) {
                    _this.params.set('connected', true);
                    _this.params.set('device', d);
                    console.log('successfully connected to',d);
                    ble.startNotification(
                        d.id,
                        "fff0",
                        "fff1",
                        _this.onData.bind(_this),
                        function(e) {
                            console.error('startNotification error',e);
                        });
                    _this.params.trigger('ready');
                    _this.sync();
                }, 
                function(msg) {
                    _this.params.set('connected',false);
                    console.warn('disconnected');
                    if (msg.errorMessage === "Peripheral Disconnected") {
                        app.geolocation.reset();
                    }
                    setTimeout(_this.enable.bind(_this), 1000);
                });
        },
        onData: function(buffer) {
            console.log('onData: ', new Uint8Array(buffer));
            // this.params.set('status2',new Uint8Array(buffer));
            this.params.setNewBikeStatus(new Uint8Array(buffer));
        },
        sync: function() {
            if (this.params.get('connected') !== true) return;
            var _this = this;
            console.log('sending: '+this.params.get('status'));
            setTimeout(this.sync.bind(this), 500);
            ble.write(
            // ble.writeWithoutResponse( TODO
                this.params.get('device').id, 
                "fff0", 
                "fff1", 
                this.params.get('status').buffer
            );
        }
    }; console.log('app.bluetooth defined');
})();