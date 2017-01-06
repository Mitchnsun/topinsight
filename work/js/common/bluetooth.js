var app = app || {};

(function($) {
    'use strict';
    app.bluetooth = {
        params: {},
        name: "LanQianTech",
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
            console.log('# initcallback #', msg);
            if (msg.status === "enabled") {
                this.connect();
            } else {
                this.error('- initcallback - ', msg);
            }
        },
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
        /* Scan */
        startScanSuccess: function(msg) {
            if (msg.status === "scanResult" && msg.name === this.name) {
                this.stopscan();
                this.params.set('address', msg.address);
                bluetoothle.connect(_.bind(this.connectsuccess, this), _.bind(this.connecterror, this), { address: this.params.get('address') });
                console.log('- startScanSuccess - ', msg);
            }
            setTimeout(_.bind(this.stopscan, this), 10000);
        },
        startScanError: function(msg) {
            this.error('- startScanError - ', msg);
            this.stopscan();
        },
        stopscan: function() {
            bluetoothle.stopScan(_.bind(this.stopScanSuccess, this));
        },
        stopScanSuccess: function(msg) {
            console.log('- stopScanSuccess - ', msg);
        },
        /* Connection */
        connect: function() {
            if (this.params.get('address')) {
                bluetoothle.reconnect(_.bind(this.reconnectsuccess, this), _.bind(this.reconnecterror, this), { address: this.params.get('address') });
            } else {
                bluetoothle.startScan(_.bind(this.startScanSuccess, this), _.bind(this.startScanError, this), this.params.get('scan'));
            }
        },
        connectsuccess: function(msg) {
            console.log('- connectsuccess - ', msg);
            bluetoothle.discover(_.bind(this.discoverSuccess, this), _.bind(this.error, this), { address: this.params.get('address') });
        },
        connecterror: function(msg) {
            if (msg !== "connect" || this.name !== msg.name) {
                this.error('- connectsuccess - ', msg);
            }
        },
        reconnectsuccess: function(msg) {
            console.log('- reconnectsuccess - ', msg);
            bluetoothle.discover(_.bind(this.discoverSuccess, this), _.bind(this.error, this), { address: this.params.get('address') });
        },
        reconnecterror: function(msg) {
            console.log('- reconnectsuccess - ', msg);
            bluetoothle.connect(_.bind(this.connectsuccess, this), _.bind(this.connecterror, this), { address: this.params.get('address') });
        },
        disconnect: function() {
            bluetoothle.disconnect(_.bind(this.success, this), _.bind(this.error, this), { address: this.params.get('address') });
        },
        discoverSuccess: function(msg) {
            console.log('- discoverSuccess -', msg);
            var services = [];
            _.each(msg.services, function(service) {
                var param = {
                    uuid: service.uuid,
                    characteristics: []
                }
                _.each(service.characteristics, function(charact) {
                    var descriptors = [];
                    _.each(charact.descriptors, function(desc) {
                        descriptors.push(desc.uuid);
                    });
                    param.characteristics.push({ uuid: charact.uuid, descriptors: descriptors });
                });
                services.push(param);
            });
            this.params.set('services', services);
            //this.readservices();
            this.subscribe();
            this.write();
        },
        /* Read */
        readservices: function() {
            var self = this;
            console.log('- readservices - services ', this.params.get('services'));
            _.each(this.params.get('services'), function(service) {
                _.each(service.characteristics, function(charact) {
                    var params = {
                        "address": self.params.get('address'),
                        "service": service.uuid,
                        "characteristic": charact.uuid
                    };
                    bluetoothle.read(_.bind(self.readsuccess, self), _.bind(self.readerror, self), params);
                    _.each(charact.descriptors, function(desc) {
                        params.descriptor = desc;
                        console.log('- readservices - descriptors ', params, desc);
                        bluetoothle.readDescriptor(_.bind(self.readsuccessdescriptor, self), _.bind(self.readerror, self), params);
                    });
                });

            });
        },
        readsuccess: function(msg) {
            console.log('- readsuccess - ', msg);
        },
        readsuccessdescriptor: function(msg) {
            console.log('- readsuccessdescriptor - ', msg);
        },
        readerror: function(msg) {
            console.log('- readerror - ', msg);
        },
        subscribe: function() {
            var params = {
                "address": this.params.get('address'),
                service: "FFF0",
                characteristic: "FFF1",
            };
            bluetoothle.subscribe(_.bind(this.subscribesuccess, this), _.bind(this.subscribeerror, this), params);
        },
        subscribesuccess: function(msg) {
            console.log('- subscribesuccess - ', msg);
        },
        subscribeerror: function(msg) {
            console.log('- subscribeerror - ', msg);
        },
        /* Write */
        write: function() {
            var value = new Uint8Array(13);
            value[1] = parseInt('10000000', 2);
            value[6] = 128;
            console.log(value, bluetoothle.bytesToEncodedString(value));
            var params = {
                address: this.params.get('address'),
                service: "FFF0",
                characteristic: "FFF1",
                value: bluetoothle.bytesToEncodedString(value)
            }
            bluetoothle.write(_.bind(this.writesuccess, this), _.bind(this.writeerror, this), params);
        },
        writesuccess: function(msg) {
            console.log('- writesuccess - ', msg);
        },
        writeerror: function(msg) {
            console.log('- writeerror - ', msg);
        }
    };
})();