define(['backbone'], function(Backbone) {
    return Backbone.Model.extend({
        url: app.urls.endpoint + app.urls.ws_login,
        loged: function(model, response, options) {
            $('.button--disabled').removeClass('button--disabled');
            app.user.set(model.get('user'));
            app.accessToken.set(model.get('accessToken'));
            app.router.navigate(app.urls.home, { trigger: true });
        }
    });
});