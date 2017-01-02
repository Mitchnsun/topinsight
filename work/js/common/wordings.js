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
            lastname: "Nom",
            firstname: "Prénom",
            email: "E-mail",
            password: "Mot de passe",
            address: "Adresse",
            phone: "Numéro de téléphone",
            vae: "Modèle VAE",
            validate: "Valider",
            signin: "Se connecter",
            FBsign: "Connexion Facebook",
            TWsign: "S'inscrire",
            errors: {
                empty: "Veuillez remplir tous les champs",
                firstname: "Le prénom doit être composé de 2 à 14 caractères",
                lastname: "Le nom doit être être composé de 2 à 14 caractères",
                email: "Format d'adresse mail invalide",
                password: "Votre mot de passe doit être compris entre 4 et 18 caractères"
            }
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