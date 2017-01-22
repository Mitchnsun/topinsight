var app = app || {};

(function($) {
    'use strict';
    app.urls = {
        /* API */
        endpoint: "http://topinsight-uat.geoks-dev.fr",
        ws_vae: "/api/v1/vaeTypes",
        ws_user: "/api/v1/users/me",
        ws_subscribe: "/api/v1/sessions/subscribe",
        ws_login: "/api/v1/sessions/login",
        ws_fblogin: "/api/v1/sessions/login/facebook",
        ws_course: "/api/v1/courses",
        ws_lastcourse: "/api/v1/courses/last/updated",
        ws_lostpassword: "/api/v1/sessions/@/password-recovery/request",
        ws_retrievepassword: "/api/v1/sessions/password-recovery/reset/",

        /* Application urls */
        home: "",
        signin: "signin",
        signup: "signup",
        signup_suite: "signup/suite",
        itinerary: "itinerary",
        lost_password: "password/lost",
        retrieve_password: "password/retrieve",

        /* Ext */
        google_maps: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrN6Q6pXFB0QGdIpxSQfzBecmTSlEwEfU",
        tweet: "https://twitter.com/intent/tweet"
    };
})();