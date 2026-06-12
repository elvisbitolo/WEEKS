import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

export const verifyToken = (req, res, next) => {
  // Extract token from HTTP-only cookie
  const token = req.cookies.accessToken;

  if (!token) {
    return res.status(401).json({ message: 'Access Denied: No Token Provided!' });
  }

  try {
    const verified = jwt.verify(token, config.accessTokenSecret);
    req.user = verified; // Append decrypted payload containing user ID/Username
    next(); // Pass control forward to the route controller
  } catch (error) {
    return res.status(403).json({ message: 'Invalid or Expired Access Token.' });
  }
};