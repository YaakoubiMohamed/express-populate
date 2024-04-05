const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Optionnel pour gérer les requêtes CORS (Cross-Origin Resource Sharing)
const path = require('path'); // Pour gérer les chemins de fichiers statiques (facultatif)

const articlesRoutes = require('./src/routes/articleRoutes'); // Importer les routes pour les articles
const userRoutes = require('./src/routes/userRoutes'); // Importer les routes pour les utilisateurs
const authRoutes = require('./src/routes/authRoutes');

// Configuration de l'environnement
require('dotenv').config();

const app = express();

// Connexion à la base de données (via le fichier db.js)
const connectDB = require('./src/config/db'); // Importer la fonction connectDB depuis db.js

// Middleware pour gérer les requêtes CORS (facultatif)
app.use(cors());

// Middleware pour parser le corps de la requête en JSON
app.use(express.json());


// Routes pour l'authentification
app.use('/api/auth', authRoutes)

// Routes pour les articles
app.use('/api/articles', articlesRoutes);

// Routes pour les utilisateurs
// app.use('/api/users', userRoutes);


const port = process.env.PORT || 5000; // Utiliser le port configuré dans l'environnement ou 5000 par défaut

// Lancer la connexion à la base de données avant de démarrer le serveur
connectDB()
  .then(() => {
    app.listen(port, () => console.log(`Serveur en écoute sur le port ${port} !`));
  })
  .catch((err) => {
    console.error('Erreur lors de la connexion à la base de données :', err);
    process.exit(1);
  });

