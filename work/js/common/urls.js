var app = app || {};

(function($) {
    'use strict';
    app.urls = {
        /* API */
        endpoint: "http://topinsight-uat.geoks-dev.fr",
        ws_vae: "/api/v1/vaeTypes",
        ws_user: "/api/v1/users",
        ws_subscribe: "/api/v1/sessions/subscribe",
        ws_login: "/api/v1/sessions/login",

        /* Application urls */
        home: "",
        signin: "signin",
        signup: "signup",
        signup_suite: "signup/suite",
        itinerary: "itinerary",

        /* Ext */
        google_maps: "https://maps.googleapis.com/maps/api/js?key=AIzaSyB1QwpL9M0phjDs9t1rk72tJMOySv90wsw"
    };
})();