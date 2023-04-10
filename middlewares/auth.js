import jwt from 'jsonwebtoken';
import config from '../config.js'; // import your secret key from a config file

export const isAuthenticated = (req, res, next) => {
  // Get the token from the request headers
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authorization header not found' });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, config.jwtKey);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
