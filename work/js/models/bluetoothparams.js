/**
 * In model to have the variable bluetoothle enabled
 */
define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        checksum: function(data) {
            return data[0] ^ data[1] ^ data[2] ^ data[3] ^ data[4] ^ data[6] ^ data[7] ^ data[8] ^ data[9] ^ data[10] ^ data[11];
        },
        defaults: {
            name: "LanQianTech",
            connected: false,
            // status: this.getDefaultStatus() // that does not work
            status: new Uint8Array([0x0C, 0x02, 0x7D, 0x56, 0x09, 0x74, 0x30, 0x4A, 0x04, 0x14, 0x0, 0x32, 0x0E]),
            status2: undefined
        },
        initStatus(vaeType) {
            if (_.isEmpty(vaeType)) {
                return false;
            }

            var data = new Uint8Array(13);

            data[0] = vaeType.p5;
            data[1] = 0x0;
            data[2] = ((vaeType.speed_limit - 10) << 3) + vaeType.wheel.width;
            data[3] = vaeType.p1;
            data[4] = vaeType.p2 + (vaeType.p3 << 3) + (vaeType.p4 << 4) + (vaeType.limit_speed_bridle << 5) + (vaeType.wheel.width_expansion << 7);

            data[6] = vaeType.c2 + (vaeType.c1 << 3);
            data[7] = vaeType.c5 + (vaeType.c14 << 5);
            data[8] = vaeType.c12 + (vaeType.c7 << 3) + (vaeType.c4 << 5);
            data[9] = vaeType.speed_limit - 10; // TODO check this parameter
            data[10] = vaeType.c13 << 2;
            data[11] = vaeType.engine.first_gear_full_speed_range;

            data[5] = this.checksum(data);
            data[12] = 0x0E;

            this.set('status', data);
        },
        changeAssistance(v) {
            // gears
            var nst = this.get('status').slice(0);
            console.log('byte 2 was', nst[1]);
            nst[1] = (nst[1] & 0xF) + v;
            if (nst[1] > 5 || nst[1] < 0) return;
            nst[1] = nst[1] + (this.get('status')[1] & 0x80);
            nst[5] = this.checksum(nst);
            this.set('status', nst);
        },
        setNewBikeStatus(d) {
            var cs = this.get('status2');
            if (cs == undefined ||
                d[1] != cs[1]) {
                this.trigger('change');
            }
            this.set('status2', d);
        },
        getAssistanceLevel() {
            var st = this.get('status');
            if (!st) return 0;
            return (st[1] & 0xF);
        },
        getBatteryLevel() {
            var st2 = this.get('status2');
            if (!st2) return 0;
            return ((st2[1] & 0x1C) >> 2);
        },
        isLightOn: function() {
            return (this.get('status')[1] & 0x80) > 0 ? true : false;
        },
        toggleLight: function() {
            var nst = this.get('status').slice(0);
            if (nst[1] & 0x80) {
                nst[1] = nst[1] - 0x80;
            } else {
                nst[1] = nst[1] + 0x80;
            }
            nst[5] = this.checksum(nst);
            this.set('status', nst);
        },
        clean: function() {
            this.clear({ silent: true }).set(this.defaults);
        }
    });
});