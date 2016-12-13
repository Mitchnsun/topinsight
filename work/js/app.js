app.initialize = function() {
    app.router = new app.Router();
    Backbone.history.start();
};

/* DOM Ready and events function */
$(document).ready(function() {
    app.initialize();
    new app.homeview();
});