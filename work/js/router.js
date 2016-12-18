app.Router = Backbone.Router.extend({
    routes: _.object([
        [app.urls.home, "home"],
        [app.urls.signup, "signup"],
        [app.urls.login, "login"],
        [app.urls.itinerary, "itinerary"]
    ]),
    home: function() {
        new app.homeview();
        console.log("route home");
    },
    signup: function() {
        console.log("route signup");
    },
    login: function() {
        console.log("route login");
    },
    itinerary: function() {
        console.log("route itinerary");
    }
});