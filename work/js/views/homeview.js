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
                shadow: true
            });

            app.geolocation.route = _.isEmpty(app.geolocation.route) ? new Route() : app.geolocation.route;
            app.bluetooth.params = new BluetoothParams();
            this.initBluetooth();

            this.listenTo(app.course, 'change', this.render);
            this.listenToOnce(app.bluetooth.params, 'ready', _.bind(app.course.start, app.course));
            this.render();
        },
        initBluetooth: function() {
            app.bluetooth.init(_.bind(this.course, this), _.bind(this.getLastCourse, this));
        },
        getLastCourse: function() {
            console.log('- get Last Course -');
            this.lastcourse = new LastCourse();
            this.lastcourse.fetch({
                data: $.param({ access_token: app.accessToken.get() }),
                success: _.bind(this.lastcoursecallback, this),
                error: _.bind(this.render, this)
            });
        },
        lastcoursecallback: function(model, response, options) {
            app.bluetooth.enable();
            app.course.set(model.get('course'));
            app.course.calcDuration();
            app.bluetooth.isenabled();
        },
        course: function() {
            if (_.isEmpty(app.course) || !app.course.get('id')) {
                app.course.start();
            }
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