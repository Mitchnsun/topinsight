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
        calcDuration: function(first, last) {
            var duration = 0;
            if (!first || !last) {
                first = new Date(this.get('created').replace(/\+.*$/, ''));
                last = new Date(this.get('updated').replace(/\+.*$/, ''));
                duration = Math.round((last.getTime() - first.getTime()) / 1000);
            } else {
                duration = Math.round((last.get('time') - first.get('time')) / 1000);
            }

            duration = _.isNaN(duration) ? 0 : duration;
            var seconds = duration % 60 > 9 ? duration % 60 : '0' + duration % 60;
            duration = Math.round(duration / 60);
            var minutes = duration % 60 > 9 ? duration % 60 : '0' + duration % 60;
            var hours = Math.round(duration / 60) > 9 ? Math.round(duration / 60) : '0' + Math.round(duration / 60);
            this.set('time', hours + ':' + minutes + ':' + seconds);
        }
    });
});