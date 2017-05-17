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
        ws_course_picture: "/api/v1/courses/@/picture",
        ws_lastcourse: "/api/v1/courses/last/updated",
        ws_lostpassword: "/api/v1/sessions/@/password-recovery/request",
        ws_retrievepassword: "/api/v1/sessions/password-recovery/reset/",
        ws_verifyemail: "/api/v1/sessions/subscribe/@/verify-email",
        ws_checkemail: "/api/v1/sessions/subscribe/@/check/",

        /* Application urls */
        home: "",
        signin: "signin",
        signup: "signup",
        signup_suite: "signup/suite",
        signup_verif: "signup/verification",
        itinerary: "itinerary",
        lost_password: "password/lost",
        retrieve_password: "password/retrieve",
        popup: "popup",
        cgu: "cgu",

        /* Ext */
        google_maps: "https://maps.googleapis.com/maps/api/js?key=AIzaSyBrN6Q6pXFB0QGdIpxSQfzBecmTSlEwEfU&libraries=places",
        tweet: "https://twitter.com/intent/tweet"
    };
})();