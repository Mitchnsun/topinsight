var app = app || {};

(function($) {
    'use strict';
    app.urls = {
        /* API */
        endpoint: "",
        ws_vae: "/api/v1/vae",
        ws_user: "/api/v1/users",

        /* Application urls */
        home: "",
        signin: "signin",
        signup: "signup",
        signup_suite: "signup/suite",
        itinerary: "itinerary"
    };
})();