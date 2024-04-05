const jwt = require('jsonwebtoken');
require('dotenv').config();

const secretKey = process.env.SECRET_KEY;
console.log(secretKey)
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    // Check for JWT token
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
      jwt.verify(token, secretKey, (err, decoded) => {
        if (err) {
            console.log(err)
          return res.status(401).json({ message: 'Invalid token' });
        }
        req.user = decoded;
        next();
      });
    } else {
      // If no JWT, check for session-based authentication (optional)
      if (!req.session || !req.session.utilisateur) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      next();
    }
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: 'Unauthorized' });
  }
};

module.exports = verifyToken;
