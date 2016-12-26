var app = app || {};

(function($) {
    'use strict';
    app.wordings = {
        dashboard: {
            header: "Tableau de bord",
            meter: {
                unit: "km/h"
            },
            elements: [{
                title: "Distance",
                data: "%f",
                unit: "km",
                icon: "assets/img/icon-road.png",
                alt: "Icon Road"
            }, {
                title: "Puissance",
                data: "%f",
                unit: "watts",
                icon: "assets/img/icon-battery.png",
                alt: "Icon Battery"
            }, {
                title: "Assistance",
                data: "%f <span>sur %f</span>",
                unit: "PAS",
                icon: "assets/img/icon-plus.png",
                alt: "Icon Plus"
            }]
        },
        sign: {
            title: "Inscription",
            header: "assets/img/logo.png",
            name: "Nom",
            surname: "Prénom",
            email: "E-mail",
            password: "Mot de passe",
            address: "Adresse",
            phone: "Numéro de téléphone",
            vae: "Modèle VAE",
            validate: "Valider",
            signin: "Se connecter",
            FBsign: "Connexion Facebook",
            TWsign: "S'inscrire"
        }
    };
})();