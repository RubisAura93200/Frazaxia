const mysql = require("mysql");

let db; // Déclaration de la connexion

module.exports = () => {
    return new Promise((resolve, reject) => {
        if (db) {
            return resolve(db); // Retourner la connexion si elle existe déjà
        }

        // Créer une nouvelle connexion si elle n'existe pas
        db = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "frazaxia",
        });

        db.connect((err) => {
            if (err) {
                if (err.code === 'ER_ACCESS_DENIED_ERROR') {
                    console.error("Erreur : Identifiants incorrects ou permissions insuffisantes pour l'utilisateur MySQL.");
                } else if (err.code === 'ENOTFOUND') {
                    console.error("Erreur : Impossible de trouver l'hôte spécifié.");
                } else {
                    console.error("Erreur lors de la connexion à la base de données :", err.message);
                }
                return reject(err);
            }
            console.log("La base de données est en train de se connectée !");
            resolve(db); // Résoudre avec la connexion à la base de données
        });
    });
};
