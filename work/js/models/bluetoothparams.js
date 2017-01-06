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
            name: "LanQianTech"
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