define(['backbone', 'views/headerview'], function(Backbone, Headerview) {
    return Backbone.Router.extend({
        routes: _.object([
            [app.urls.home, "home"],
            [app.urls.signin, "signin"],
            [app.urls.signup, "signup"],
            [app.urls.signup_suite, "signupsuite"],
            [app.urls.itinerary, "itinerary"],
            [app.urls.lost_password, "lostpassword"],
            [app.urls.retrieve_password, "retrievepassword"],
            ["*path", "home"]
        ]),
        loadView: function(path) {
            var self = this;
            this.view && (this.view.close ? this.view.close() : this.view.undelegateEvents());
            require([path], function(View) {
                self.view = new View({ headerview: self.header() });
            });
        },
        home: function() {
            this.loadView('views/homeview');
        },
        signin: function() {
            this.loadView('views/signinview');
        },
        signup: function() {
            this.loadView('views/signupview');
        },
        signupsuite: function() {
            this.loadView('views/signupview');
        },
        itinerary: function() {
            this.loadView('views/itineraryview');
        },
        lostpassword: function() {
            this.loadView('views/lostpasswordview');
        },
        retrievepassword: function() {
            this.loadView('views/retrievepasswordview');
        },
        header: function() {
            return this.headerview = this.headerview || new Headerview();
        }
    });
});