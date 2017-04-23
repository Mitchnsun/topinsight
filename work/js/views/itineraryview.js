define(['backbone'], function(Backbone) {
    return Backbone.View.extend({
        el: ".app",
        height: $(window).height(),
        wordings: app.wordings.itinerary,
        initialize: function(options) {
            this.route = app.geolocation.route;
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.header,
                back: true
            });

            this.listenToOnce(app.bluetooth.params, 'ready', _.bind(app.course.start, app.course));
            this.render();
        },
        setTweetUrl: function() {
            var tweet = app.urls.tweet + '?text=' + this.wordings.share_message + ' ';
            tweet = app.course.get('distance') ? tweet + app.course.get('distance') : tweet + 0;
            tweet += ' ' + this.wordings.distance.unit;
            tweet += '&hashtags=' + this.wordings.hashtags;

            return encodeURI(tweet);
        },
        render: function() {
            $(this.el).html(Handlebars.templates["itinerary.html"]({
                wordings: this.wordings,
                urls: app.urls,
                course: app.course.toJSON(),
                tweeturl: this.setTweetUrl()
            }));

            if (this.route.length > 0) {
                this.starting_location = this.route.startinglocation();
            } else if (app.course.get('latitude_start')) {
                this.starting_location = {
                    lat: parseFloat(app.course.get('latitude_start')),
                    lng: parseFloat(app.course.get('longitude_start'))
                };
            } else {
                this.starting_location = _.isEmpty(this.starting_location) ? app.wordings.defaultGPS : this.starting_location;
            }

            require(['async!' + app.urls.google_maps], _.bind(this.rendermaps, this));
        },
        /* Google Maps */
        rendermaps: function() {
            var heightHeader = $('header').height();
            var heightFooter = $('.itinerary__footer').height();
            $('.itinerary__map').height(this.height - heightHeader - heightFooter);
            this.map = new google.maps.Map(document.getElementById('map'), {
                center: this.starting_location,
                zoom: 14
            });

            this.listenTo(this.route, 'updated', _.bind(this.update, this));

            if (this.route.length > 0) {
                this.addStartingPoint();
                this.traceRoute();
            } else if (app.course.get('latitude_start')) {
                this.addStartingPoint();
            }
        },
        addStartingPoint: function() {
            this.starting_location.marker = new google.maps.Marker({
                position: this.starting_location,
                map: this.map,
                title: this.wordings.start,
                icon: this.wordings.icon
            });
        },
        update: function() {
            if (!this.starting_location.marker) {
                this.starting_location = this.route.startinglocation();
                this.addStartingPoint();
            }
            this.traceRoute();
            $('.itinerary__element__data--time').html(app.course.get('time'));
            var distance = app.course.get('distance');
            distance = distance ? distance : 0;
            $('.itinerary__element__data--distance').html(distance + ' ' + this.wordings.distance.unit);
            $('.button--twitter').attr('href', this.setTweetUrl());
        },
        traceRoute: function() {
            this.googlepath = new google.maps.Polyline({
                path: this.route.toJSON(),
                geodesic: true,
                strokeColor: '#00BFA5',
                strokeOpacity: 1.0,
                strokeWeight: 5
            });
            this.googlepath.setMap(this.map);
            var lastPosition = this.route.last();
            app.course.set('distance', (google.maps.geometry.spherical.computeLength(this.googlepath.getPath()) / 1000).toFixed(2));
            if (lastPosition) {
                this.map.setCenter(lastPosition.location());
            }

            // Calculate Speed
            var routeEnd = _.last(this.route.toJSON(), 5);
            var first = _.first(routeEnd);
            var last = _.last(routeEnd);
            var duration = Math.round((last.time - first.time) / 1000)
            var endPath = new google.maps.Polyline({
                path: routeEnd,
                geodesic: true
            });

            var speed = ((google.maps.geometry.spherical.computeLength(endPath.getPath())).toFixed(2) / duration) * 3.6;
            app.course.set('speed', speed ? speed.toFixed(2) : 0);
        },
        /* User actions */
        events: {
            "click .button--facebook": "share",
            "click .button--reset": "reset"
        },
        share: function(e) {
            if (e && e.preventDefault) {
                e.preventDefault();
            }

            var url = app.urls.endpoint + app.urls.ws_course;
            url += app.course.get('id') ? '/' + app.course.get('id') : '';
            var message = this.wordings.share_message + ' ';
            message = app.course.get('distance') ? message + app.course.get('distance') : message + 0;
            message += ' ' + this.wordings.distance.unit;

            if (facebookConnectPlugin) {
                facebookConnectPlugin.showDialog({
                        method: "share",
                        href: url,
                        caption: message
                    },
                    _.bind(this.shareCallback, this)
                );
            } else {
                app.popupview.render(app.wordings.errors.facebook);
            }
        },
        shareCallback: function(response) {
            app.hack.statusbar();
            console.log(response);
        },
        reset: function(e) {
            e.preventDefault();
            this.starting_location = app.geolocation.route.last();
            this.starting_location = this.starting_location ? this.starting_location.location() : {};
            this.stopListening();
            app.geolocation.start_date = Date.now();
            app.bluetooth.ready();
            app.geolocation.reset();
            app.geolocation.start();
            this.listenToOnce(this.route, 'updated', _.bind(this.render, this));
        },
        close: function() {
            this.undelegateEvents();
            this.stopListening();
        }
    });
});