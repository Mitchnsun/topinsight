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
                icon: "assets/img/icons/icon-road.png",
                alt: "Icon Road"
            }, {
                title: "Puissance",
                data: "%f",
                unit: "watts",
                icon: "assets/img/icons/icon-battery.png",
                alt: "Icon Battery"
            }, {
                title: "Assistance",
                data: "%f <span>sur %f</span>",
                unit: "PAS",
                icon: "assets/img/icons/icon-plus.png",
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
            lostpassword: "Mot de passe oublié ?",
            validate: "Valider",
            signin: "Se connecter",
            FBsign: "Connexion Facebook",
            TWsign: "S'inscrire"
        },
        password: {
            header: "Mot de passe oublié",
            email: "E-mail",
            code: "Code",
            new_password: "Nouveau mot de passe",
            password_again: "Retaper le mot de passe",
            text: "Merci de renseigner votre mail, un code va vous être envoyé",
            validate: "Valider"
        },
        itinerary: {
            header: "Parcours",
            reset: "Remettre à zéro",
            elements: [{
                title: "Temps",
                data: "01:30:22",
                unit: "",
                icon: "assets/img/icons/icon-clock-grey.png",
                alt: "Clock Icon"
            }, {
                title: "Distance",
                data: "%f",
                unit: "km",
                icon: "assets/img/icons/icon-road.png",
                alt: "Road Icon"
            }]
        }
    };
})();