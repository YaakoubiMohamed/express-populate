const mongoose = require('mongoose');

// Charger les variables d'environnement (éviter de stocker directement les informations sensibles dans le code)
require('dotenv').config();

const MONGODB_URI = process.env.MONGOGB_URI; // URL de connexion à Mongoose Cloud
console.log(MONGODB_URI)
// Fonction pour se connecter à la base de données
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connexion à la base de données réussie !');
  } catch (err) {
    console.error('Erreur lors de la connexion à la base de données :', err);
    process.exit(1); // Arrêter l'application en cas d'erreur
  }
};

module.exports = connectDB;