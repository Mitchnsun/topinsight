define(['backbone', 'models/lastcourse', 'models/bluetoothparams', 'collections/route'], function(Backbone, LastCourse, BluetoothParams, Route) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.dashboard,
        initialize: function(options) {
            if (!app.accessToken.get()) {
                app.router.navigate(app.urls.signin, { trigger: true });
                return false;
            }

            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.header,
                back: false,
                forward: true,
                signout: true,
            });

            this.lastcourse = new LastCourse();
            this.lastcourse.fetch({
                data: $.param({ access_token: app.accessToken.get() }),
                success: _.bind(this.lastcoursecallback, this),
                error: _.bind(this.render, this)
            });

            this.listenTo(app.course, 'change', this.render);
            app.bluetooth.params = new BluetoothParams();
            //app.bluetooth.init();
            app.geolocation.route = _.isEmpty(app.geolocation.route) ? new Route() : app.geolocation.route;
            app.geolocation.init();
        },
        lastcoursecallback: function(model, response, options) {
            app.course.set(model.get('course'));
        },
        render: function() {
            $(this.el).html(Handlebars.templates["home.html"]({
                course: app.course.toJSON(),
                wordings: this.wordings
            }));
        },
        close: function() {
            this.undelegateEvents();
            this.stopListening();
        }
    });
});