define(['backbone', 'views/headerview'], function(Backbone, Headerview) {
    return Backbone.Router.extend({
        routes: _.object([
            [app.urls.home, "home"],
            [app.urls.signup, "signup"],
            [app.urls.login, "login"],
            [app.urls.itinerary, "itinerary"]
        ]),
        home: function() {
            var self = this;
            require(['views/homeview'], function(Homeview) {
                new Homeview({
                    headerview: self.header()
                });
            });
        },
        signup: function() {
            console.log("route signup");
        },
        login: function() {
            console.log("route login");
        },
        itinerary: function() {
            console.log("route itinerary");
        },
        header: function() {
            return this.headerview = this.headerview || new Headerview();
        }
    });
});