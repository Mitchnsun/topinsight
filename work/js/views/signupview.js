define(['backbone', 'models/vae', 'models/subscribe', 'async!' + app.urls.google_maps], function(Backbone, Vae, Subscribe) {
    return Backbone.View.extend({
        el: ".app",
        wordings: app.wordings.sign,
        emailverified: false,
        initialize: function(options) {
            if (app.accessToken.get()) {
                app.router.navigate(app.urls.home, { trigger: true });
                return false;
            }

            this.suite = window.location.hash.match(/suite/) !== null ? true : false;
            this.tmpl = this.suite ? Handlebars.templates["signup-suite.html"] : Handlebars.templates["signup.html"];
            this.headerview = options.headerview;
            this.headerview.render({
                title: this.wordings.title,
                back: true
            });
            app.subscribe = app.subscribe ? app.subscribe : new Subscribe();

            this.render();
        },

        render: function() {
            $(this.el).html(this.tmpl({
                wordings: this.wordings,
                user: app.subscribe.toJSON(),
                urls: app.urls,
                vae: app.vae.toJSON()
            }));
            app.hack.form();

            if (google && this.suite) {
                this.autocomplete = new google.maps.places.Autocomplete((document.getElementById('addressAutocomplete')), { types: ['geocode'] });
                google.maps.event.addListener(this.autocomplete, 'place_changed', function() {
                    app.hack.nextfield($('.input__element'));
                });
                app.geolocation.init();
                app.geolocation.getOneLocation(_.bind(this.geolocate, this));
                this.geolocate();
            }

            if (app.subscribe.get('vaeType')) {
                $('.input__element--vae').val(app.subscribe.get('vaeType'));
            }
        },
        geolocate: function(locations) {
            var location = _.last(locations);
            if (location) {
                var geolocation = {
                    lat: location.latitude,
                    lng: location.longitude
                };
                var circle = new google.maps.Circle({
                    center: geolocation,
                    radius: location.accuracy
                });
                this.autocomplete.setBounds(circle.getBounds());
            }
        },
        events: {
            "click .input__label--link": "save",
            "submit": "submit",
            "focusout .input__element--totrim": "trim",
            "focusout .input__element--email": "verifyEmail",
            "focusin #addressAutocomplete, .input__element--email": "scrollForAutocomplete"
        },
        save: function() {
            console.log('save', $('.input__element'));
            app.subscribe.set(app.rules.user.verification($('.input__element')));
        },
        trim: function(e) {
            var target = $(e.currentTarget);
            target.val(target.val().trim());
        },
        scrollForAutocomplete: function() {
            if (!/iPad|iPhone|iPod/.test(navigator.userAgent)) {
                // We have to wait the keyboard opens to force the window scroll
                setTimeout(function() {
                    window.scrollTo(0, 100);
                }, 500);
            }
        },
        verifyEmail: function(suite) {
            var self = this;
            var target = $('.input__element--email');
            target.val(target.val().trim());
            var email = target.val();

            $.ajax({
                url: app.urls.endpoint + app.urls.ws_verifyemail.replace('@', email),
                type: 'GET',
                success: function(data) {
                    self.emailverified = !data["already-subscribed"];
                    if (suite === true && self.emailverified) {
                        app.router.navigate(app.urls.signup_suite, { trigger: true });
                    } else if (!self.emailverified && suite === true) {
                        app.popupview.render(app.wordings.errors.verifyemail);
                    }
                }
            });
        },
        submit: function(e) {
            e.preventDefault();
            if ($(e.currentTarget).hasClass('button--disabled')) {
                return false;
            }

            app.subscribe.set(app.rules.user.verification($('.input__element')));
            var subscribe = app.subscribe.toJSON();
            if (/Android/.test(navigator.userAgent) && subscribe.empty) {
                app.subscribe.unset('empty');
                app.subscribe.unset('errors');
                app.hack.nextfield($('.input__element'));
            } else if (subscribe.empty) {
                app.popupview.render(subscribe.empty);
                app.subscribe.unset('empty');
                app.subscribe.unset('errors');
            } else if (subscribe.errors) {
                app.popupview.render(_.first(subscribe.errors));
                app.subscribe.unset('errors');
            } else if (!this.suite) {
                this.signupsuite();
            } else {
                $(e.currentTarget).addClass('button--disabled');
                app.subscribe.save({}, {
                    success: _.bind(this.success, this),
                    error: _.bind(app.popupview.errorcallback, app.popupview)
                });
            }
        },
        signupsuite: function() {
            if (this.emailverified) {
                app.router.navigate(app.urls.signup_suite, { trigger: true });
            } else {
                this.verifyEmail(true);
            }
        },
        success: function(model, response, options) {
            $('.button--disabled').removeClass('button--disabled');
            app.user.set(model.get('user'));
            app.bluetooth.params.initStatus(model.get('user').vae_type);
            app.accessToken.set(model.get('access_token'));
            app.popupview.confirm(false, app.wordings.sign.code_sent, this.gotoverification);
        },
        gotoverification: function() {
            app.router.navigate(app.urls.signup_verif, { trigger: true });
        },
        close: function() {
            $(document).off('DOMNodeInserted');
            this.undelegateEvents();
            this.stopListening();
        }
    });
});