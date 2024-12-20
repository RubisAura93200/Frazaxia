const fs = require("fs");

module.exports = async bot => {
    // Récupère tous les fichiers dans le dossier Commandes
    const commandFiles = fs.readdirSync("./Commandes").filter(f => f.endsWith(".js"));

    // Parcourt chaque fichier de commande
    for (const file of commandFiles) {
        try {
            const command = require(`../Commandes/${file}`);
            
            // Vérifie si la commande a un nom valide
            if (!command.name || typeof command.name !== "string") {
                throw new TypeError(`La commande ${file.slice(0, file.length - 3)} n'a pas de nom !`);
            }

            // Ajoute la commande à la collection du bot
            bot.commands.set(command.name, command);
            console.log(`La commande ${file} est opérationnelle !`);

        } catch (error) {
            console.error(`Erreur lors du chargement de la commande ${file}:`, error);
        }
    }
};
