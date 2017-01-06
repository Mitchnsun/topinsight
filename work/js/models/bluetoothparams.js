/**
 * In model to have the variable bluetoothle enabled
 */
define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        initialize: function() {
            this.retrieveparams();
            this.listenTo(this, 'change', _.bind(this.saveparams, this));
        },
        defaults: {
            init: {
                "request": true,
                "statusReceiver": false,
                "restoreKey": "bluetoothleplugin"
            },
            scan: {
                "services": [],
                "allowDuplicates": true,
                "scanMode": bluetoothle.SCAN_MODE_LOW_LATENCY,
                "matchMode": bluetoothle.MATCH_MODE_AGGRESSIVE,
                "matchNum": bluetoothle.MATCH_NUM_MAX_ADVERTISEMENT,
                "callbackType": bluetoothle.CALLBACK_TYPE_ALL_MATCHES,
            },
            services: []
        },
        saveparams: function() {
            localStorage.setItem('bluetooth-address', this.get('address'));
        },
        retrieveparams: function() {
            this.set('address', localStorage.getItem('bluetooth-address', this.get('address')));
        },
        clean: function() {
            localStorage.removeItem('bluetooth-address');
            this.clear({ silent: true }).set(this.defaults);
        }
    });
});