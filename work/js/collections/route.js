define(['backbone', 'models/location'], function(Backbone, Location) {
    return Backbone.Collection.extend({
        model: Location,
        comparator: 'time',
        startinglocation: function() {
            var model = this.first();
            return model ? model.location() : app.wordings.defaultGPS;
        }
    });
});