define(['backbone', 'models/course'], function(Backbone, Course) {
    return Backbone.Collection.extend({
        model: Course,
        comparator: 'time'
    });
});