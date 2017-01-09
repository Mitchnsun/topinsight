define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        defaults: {
            time: "00:00:00",
            distance: "0"
        },
        url: app.urls.endpoint + app.urls.ws_course,
        parse: function(response, options) {
            return response.course;
        },
        setDuration: function(first, last) {
            var duration = Math.round((last.get('time') - first.get('time')) / 1000);
            var seconds = duration % 60 > 9 ? duration % 60 : '0' + duration % 60;
            duration = Math.round(duration / 60);
            var minutes = duration % 60 > 9 ? duration % 60 : '0' + duration % 60;
            var hours = Math.round(duration / 60) > 9 ? Math.round(duration / 60) : '0' + Math.round(duration / 60);
            this.set('time', hours + ':' + minutes + ':' + seconds);
        }
    });
});