/**
 * In model to have the variable bluetoothle enabled
 */
define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
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
            }
        }
    });
});