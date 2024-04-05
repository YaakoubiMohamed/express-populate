const bcrypt = require('bcrypt'); // For password hashing
const jwt = require('jsonwebtoken'); // For JWT generation

const User = require('../models/user'); // Assuming your User model path

exports.register = async (req, res) => {
  try {
    const { nom, prenom, email, password } = req.body;

    // Validate user data (optional)

    const hashedPassword = await bcrypt.hash(password, 10); // Hash password securely

    const newUser = new User({ nom, prenom, email, password: hashedPassword });
    await newUser.save();

    // Generate JWT token (optional, replace with login logic)
    // const token = jwt.sign({ _id: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(201).json({ message: 'Enregistrement réussi' });
  } catch (error) {
    console.error(error);
    let errorMessage = 'Une erreur est survenue lors de l\'enregistrement.';
    if (error.code === 11000 && error.keyValue.email) {
      errorMessage = 'Adresse email déjà utilisée.';
    }
    res.status(500).json({ message: errorMessage });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'Identifiants incorrects' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Identifiants incorrects' });
    }

    // Generate JWT token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET,  { expiresIn: '1h' });

    res.status(200).json({ token,user, message: 'Connexion réussie' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
};

// Logout with session management is not recommended with JWT. Consider token invalidation strategies.
exports.logout = async (req, res) => {
  res.status(200).json({ message: 'Déconnexion réussie (implémentation à revoir pour JWT)' }); 
};

exports.profile = async (req, res) => {
  try {
    const userId = req.user._id; // Assuming user ID is extracted from JWT

    const user = await User.findById(userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'Utilisateur introuvable' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la récupération du profil.' });
  }
};
