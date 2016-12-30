define(['backbone', 'views/headerview'], function(Backbone, Headerview) {
    return Backbone.Router.extend({
        routes: _.object([
            [app.urls.home, "home"],
            [app.urls.signin, "signin"],
            [app.urls.signup, "signup"],
            [app.urls.signup_suite, "signupsuite"],
            [app.urls.itinerary, "itinerary"]
        ]),
        home: function() {
            var self = this;
            require(['views/homeview'], function(Homeview) {
                new Homeview({ headerview: self.header() });
            });
        },
        signin: function() {
            var self = this;
            require(['views/signinview'], function(Signinview) {
                new Signinview({ headerview: self.header() });
            });
        },
        signup: function() {
            var self = this;
            require(['views/signupview'], function(Signupview) {
                new Signupview({ headerview: self.header() });
            });
        },
        signupsuite: function() {
            var self = this;
            require(['views/signupview'], function(Signupview) {
                new Signupview({
                    headerview: self.header(),
                    suite: true
                });
            });
        },
        itinerary: function() {
            var self = this;
            require(['views/itineraryview'], function(Itineraryview) {
                new Itineraryview({ headerview: self.header() });
            });
        },
        header: function() {
            return this.headerview = this.headerview || new Headerview();
        }
    });
});