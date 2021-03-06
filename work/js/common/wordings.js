var app = app || {};

(function($) {
    'use strict';
    app.wordings = {
        /* Configuration */
        defaultGPS: {
            /* Paris, France */
            lat: 48.8566,
            lng: 2.3522
        },
        FBversion: "v2.8",
        FBApiID: "1354634814611917",
        AndroidKeyHash: "JOezvZxfG+vARrOlVMv4woIYYiM=",
        theme_color: "#00BFA5",
        /* Labels */
        continue: "continuer",
        cancel: "annuler",
        yes: "oui",
        errors: {
            default: "Une erreur est survenue, veuillez réessayer dans quelques instants",
            bluetooth: "Une erreur est survenue avec le module Bluetooth, veuillez réessayer dans quelques instants",
            facebook: "Une erreur est survenue avec Facebook, veuillez réessayer dans quelques instants",
            /* Front errors */
            empty: "Veuillez remplir tous les champs",
            firstname: "Le prénom doit être composé de 2 à 14 caractères",
            lastname: "Le nom doit être être composé de 2 à 14 caractères",
            email: "Format d'adresse mail invalide",
            password: "Votre mot de passe doit être compris entre 4 et 18 caractères",
            same_password: "Les deux mots de passe renseignés doivent être identiques",
            phone: "Le numéro de téléphone est invalide",
            /* Back errors */
            http: {
                "401": "Une authentification est nécessaire pour accéder à la ressource",
                "403": "Cette ressource est interdite d'accès",
                "404": "Ressource non trouvée",
                "422": "L’entité fournie avec la requête est incompréhensible ou incomplète",
                "500": "Erreur interne du serveur",
            },
            "verifyemail": "Cet email existe déjà",
            "geoks.user.email.invalid": "Identifiants incorrects",
            "geoks.user.email.nonExpired": "Le mot de passe a déjà été réinitialisé, vérifiez votre boîte mail",
            "geoks.user.login.wrong": "Le mot de passe est incorrect",
            "geoks.user.token.notFound": "Le code d'activation est incorrect",
            "geoks.user.notFound": "Utilisateur inconnu",
            "geoks.user.bad_token": "Le code d'activation est incorrect"
        },
        cgu: {
            title: "CGU"
        },
        dashboard: {
            header: "Tableau de bord",
            maxspeed: 50,
            meter: {
                unit: "km/h"
            },
            distance: {
                title: "Distance",
                unit: "km",
                icon: "assets/img/icons/icon-road.png",
                alt: "Icon Road"
            },
            power: {
                title: "Puissance",
                unit: "watts",
                icon: "assets/img/icons/icon-battery.png",
                alt: "Icon Battery"
            },
            assistance: {
                title: "Assistance",
                pace: "sur 5",
                unit: "PAS",
                icon: "assets/img/icons/icon-plus.png",
                alt: "Icon Plus"
            }
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
            vae: "Votre modèle",
            lostpassword: "Mot de passe oublié ?",
            validate: "Valider",
            signin: "Se connecter",
            signout: "Voulez vous vous déconnecter ?",
            FBsign: "Connexion Facebook",
            TWsign: "S'inscrire",
            code: "Code",
            code_sent: "Un code de confirmation vient de vous être envoyé par email",
            verification: "Merci de renseigner le code envoyé par email pour valider votre inscription",
            cgu: "En validant mon inscription, j'accepte les conditions générales d'utilisation"
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
            start: "Point de départ",
            icon: "assets/img/icons/icon-location.png",
            share_message: "course en vélo électrique de",
            hashtags: "topinsight,electrique",
            duration: {
                title: "Temps",
                data: "01:30:22",
                icon: "assets/img/icons/icon-clock-grey.png",
                alt: "Clock Icon"
            },
            distance: {
                title: "Distance",
                data: "%f",
                unit: "km",
                icon: "assets/img/icons/icon-road.png",
                alt: "Road Icon"
            }
        }
    };
})();