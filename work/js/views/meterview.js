define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        wordings: app.wordings.dashboard,
        render: function() {
            $(".dashboard__meter").html(Handlebars.templates["meter.html"]({
                course: app.course.toJSON(),
                wordings: this.wordings
            }));
            this.positioning();
        },
        positioning: function() {
            var $image = $('.dashboard__meter img');
            var $speed = $('.dashboard__meter__data');
            var speed = app.course.get('speed') ? parseFloat(app.course.get('speed')) : 0;
            var image_position = $image.position();
            var image_size = {
                width: $image.width(),
                height: $image.height()
            };
            var image_center = {
                x: image_position.left + image_size.width / 2,
                y: image_position.top + image_size.height / 2
            }
            var radius = image_size.width * 0.42; // ratio of circle on image size 0,84

            /* Positioning speed */
            var speed_size = $speed.width();
            $speed.css('left', Math.ceil(image_position.left + (image_size.width - speed_size) / 2));
        }
    });
});