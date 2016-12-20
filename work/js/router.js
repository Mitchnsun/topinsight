define(['backbone', 'views/headerview'], function(Backbone, Headerview) {
    return Backbone.Router.extend({
        routes: _.object([
            [app.urls.home, "home"],
            [app.urls.signup, "signup"],
            [app.urls.login, "login"],
            [app.urls.itinerary, "itinerary"]
        ]),
        home: function() {
            this.header({
                title: app.wordings.dashboard.header
            });
            require(['views/homeview'], function(Homeview) {
                new Homeview();
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
        header: function(options) {
            if (!this.headerview) {
                this.headerview = new Headerview();
            }
            this.headerview.render(options);
        }
    });
});