const fs = require("fs");

module.exports = async bot => {
    // Utilisation de for...of pour gérer correctement les promises
    const eventFiles = fs.readdirSync("./Events").filter(f => f.endsWith(".js"));

    for (const file of eventFiles) {
        try {
            const event = require(`../Events/${file}`);
            const eventName = file.split(".js")[0]; // Récupère le nom de l'événement sans ".js"

            // Lier l'événement au bot, en appelant la fonction de l'événement
            bot.on(eventName, event.bind(null, bot));
            
            console.log(`L'événement ${file} est opérationnel !`);
        } catch (error) {
            console.error(`Erreur lors du chargement de l'événement ${file}:`, error);
        }
    }
};
