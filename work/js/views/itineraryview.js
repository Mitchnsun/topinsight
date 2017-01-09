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
            this.render();
        },
        render: function() {
            $(this.el).html(Handlebars.templates["itinerary.html"]({
                wordings: this.wordings,
                urls: app.urls,
                course: app.course.toJSON()
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
            if (lastPosition) {
                this.map.setCenter(lastPosition.location());
            }
        },
        /* User actions */
        events: {
            "click .button--facebook": "share",
            "click .button--twitter": "share",
            "click .button--reset": "reset"
        },
        share: function(e) {
            e.preventDefault();
            console.log(e);
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