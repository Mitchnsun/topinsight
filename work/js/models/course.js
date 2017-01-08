define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: app.urls.endpoint + app.urls.ws_course,
        parse: function(response, options) {
            console.log(response, options);
            return response.course;
        }
    });
});