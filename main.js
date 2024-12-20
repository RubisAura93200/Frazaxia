const Discord = require("discord.js");
  // Assurez-vous d'importer correctement les classes Client et Intents
const loadCommands = require("./Loaders/loadCommands");
const loadEvents = require("./Loaders/loadEvents")
const config = require("./config");  // Assurez-vous que votre config.js contient le token du bot

// Créez un client Discord avec les intents nécessaires
const intents = new Discord.IntentsBitField(3276799);  // Remplacez 3276799 par les intents nécessaires pour votre bot
const bot = new Discord.Client({intents});

// Initialisation de la collection de commandes
bot.commands = new Discord.Collection();

// Liste des propriétaires du bot (par ID Discord)
bot.owners = ["1117413053743505409"]; // Remplacez ces IDs par ceux de vos propriétaires du bot

// Définition de la couleur du bot
bot.color = "#900190"; 

// Fonctions utilitaires pour le bot
bot.function = {
    createId: require("./Fonctions/createId"),  // Charge la fonction pour générer un ID
    searchSpam: require("./Fonctions/searchSpam"),  // Charge la fonction de détection de spam
};

// Connexion du bot avec son token
bot.login(config.token)
    .then(() => {
        console.log("Bot connecté avec succès !");
    })
    .catch((err) => {
        console.error("Erreur de connexion au bot : ", err);
    });

// Chargement des commandes et des événements
loadCommands(bot);  // Charge les commandes depuis le fichier loadCommands.js
loadEvents(bot);  // Charge les événements depuis le fichier loadEvents.js

// https://discord.com/api/webhooks/1317297253140136070/REAXHbHHr3Q3mGL9k7Gwol0qfiriXWEQRid936kClGXzhRiyXcnjdwHNxe8tr3_bs-c2