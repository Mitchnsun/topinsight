define(['backbone', 'views/meterview', 'models/lastcourse', 'models/bluetoothparams', 'collections/route'], function(Backbone, MeterView, LastCourse, BluetoothParams, Route) {
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
            this.meterview = new MeterView();

            app.geolocation.route = _.isEmpty(app.geolocation.route) ? new Route() : app.geolocation.route;

            this.listenToOnce(app.bluetooth.params, 'ready', _.bind(app.course.start, app.course));

            app.bluetooth.isConnected(_.bind(this.course, this), _.bind(this.getLastCourse, this));

            this.initBluetooth();

            this.render();
            this.listenTo(app.course, 'change', this.render);
            this.listenTo(app.bluetooth.params, 'change', this.render);
        },
        initBluetooth: function() {
            app.bluetooth.enable();
        },
        getLastCourse: function() {
            app.course.clear();
            this.lastcourse = new LastCourse();
            this.lastcourse.fetch({
                data: $.param({ access_token: app.accessToken.get() }),
                success: _.bind(this.lastcoursecallback, this),
                error: _.bind(this.render, this)
            });
        },
        lastcoursecallback: function(model, response, options) {
            app.course.set(model.get('course'));
            app.course.calcDuration();
        },
        course: function() {
            if (_.isEmpty(app.course) || !app.course.get('id')) {
                app.course.start();
            }
            this.listenTo(app.geolocation.route, 'updated', _.bind(this.updatecourse, this));
            require(['async!' + app.urls.google_maps], _.bind(this.updatecourse, this));
        },
        updatecourse: function() {
            if (google && app.geolocation.route.length > 0) {
                var googlepath = new google.maps.Polyline({
                    path: app.geolocation.route.toJSON(),
                    geodesic: true
                });
                app.course.set('distance', (google.maps.geometry.spherical.computeLength(googlepath.getPath()) / 1000).toFixed(2));

                var routeEnd = _.last(app.geolocation.route.toJSON(), 5);
                var first = _.first(routeEnd);
                var last = _.last(routeEnd);
                var duration = Math.round((last.time - first.time) / 1000)
                var endPath = new google.maps.Polyline({
                    path: routeEnd,
                    geodesic: true
                });

                var speed = ((google.maps.geometry.spherical.computeLength(endPath.getPath())).toFixed(2) / duration) * 3.6;
                app.course.set('speed', speed ? speed.toFixed(2) : 0);
            }
        },
        render: function() {
            var bl = app.bluetooth.params.getBatteryLevel();
            $(this.el).html(Handlebars.templates["home.html"]({
                course: app.course.toJSON(),
                batt4: bl < 4,
                batt3: bl < 3,
                batt2: bl < 2,
                batt1: bl < 1,
                isLightOff: !app.bluetooth.params.isLightOn(),
                assistance: app.bluetooth.params.getAssistanceLevel(),
                wordings: this.wordings,
                urls: app.urls
            }));
            this.meterview.render();
            this.disabledButtons()
        },
        disabledButtons: function() {
            $('.button--minus, .button--plus').removeClass('button--round--grey');

            var assistance = app.bluetooth.params.getAssistanceLevel();
            assistance = assistance ? assistance : 0;

            if (assistance === 0) {
                $('.button--minus').addClass('button--round--grey');
            } else if (assistance === 5) {
                $('.button--plus').addClass('button--round--grey');
            }
        },
        events: {
            "click .button--minus": "lowerAssistance",
            "click .button--plus": "greaterAssistance",
            "click .button--light": "lightup"
        },
        lowerAssistance: function(e) {
            // You can use the class button--disabled if a async function is called
            e.preventDefault();
            app.bluetooth.params.changeAssistance(-1);
        },
        greaterAssistance: function(e) {
            // You can use the class button--disabled if a async function is called
            e.preventDefault();
            app.bluetooth.params.changeAssistance(1);
        },
        lightup: function(e) {
            e.preventDefault();
            app.bluetooth.params.toggleLight();
        },
        close: function() {
            this.undelegateEvents();
            this.stopListening();
        }
    });
});