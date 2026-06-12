import { Router } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { config } from '../config/env.js';

const router = Router();

// In-Memory User and Revoked Token Tables
const usersDb = [];
let revokedRefreshTokens = new Set(); 

// --- 1. USER REGISTRATION ---
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Simple validation criteria rule check
    if (!username || !password || username.length < 3 || password.length < 6) {
      return res.status(400).json({ message: 'Username (min 3 chars) and Password (min 6 chars) are required.' });
    }

    // Verify user uniqueness
    const userExists = usersDb.find(u => u.username === username);
    if (userExists) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Hash the password securely
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = { id: Date.now().toString(), username, password: hashedPassword };
    usersDb.push(newUser);

    res.status(201).json({ message: 'User registered successfully!', userId: newUser.id });
  } catch (error) {
    res.status(500).json({ message: 'Error establishing user account.' });
  }
});

// --- 2. USER LOGIN (Issues Access & Refresh Tokens) ---
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = usersDb.find(u => u.username === username);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials profile mismatch.' });
    }

    // Verify Password Match
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials profile mismatch.' });
    }

    // Create Short-Lived Access Token (15 Minutes)
    const accessToken = jwt.sign(
      { id: user.id, username: user.username },
      config.accessTokenSecret,
      { expiresIn: '15m' }
    );

    // Create Long-Lived Refresh Token (7 Days)
    const refreshToken = jwt.sign(
      { id: user.id },
      config.refreshTokenSecret,
      { expiresIn: '7d' }
    );

    // Attach Tokens inside Secure HTTP-Only Cookies
    res.cookie('accessToken', accessToken, { httpOnly: true, secure: false, maxAge: 15 * 60 * 1000 });
    res.cookie('refreshToken', refreshToken, { httpOnly: true, secure: false, maxAge: 7 * 24 * 60 * 60 * 1000 });

    res.json({ message: 'Authentication Successful!', user: { id: user.id, username: user.username } });
  } catch (error) {
    res.status(500).json({ message: 'Login execution failure error.' });
  }
});

// --- 3. REFRESH TOKEN ACCESS ROUTE ---
router.post('/refresh', (req, res) => {
  const refreshToken = req.cookies.refreshToken;

  if (!refreshToken) {
    return res.status(401).json({ message: 'Refresh token missing. Re-authentication required.' });
  }

  if (revokedRefreshTokens.has(refreshToken)) {
    return res.status(403).json({ message: 'Token has been explicitly revoked.' });
  }

  try {
    const decoded = jwt.verify(refreshToken, config.refreshTokenSecret);
    const user = usersDb.find(u => u.id === decoded.id);

    if (!user) {
      return res.status(403).json({ message: 'User profile match not found.' });
    }

    // Issue a brand new access token
    const newAccessToken = jwt.sign(
      { id: user.id, username: user.username },
      config.accessTokenSecret,
      { expiresIn: '15m' }
    );

    res.cookie('accessToken', newAccessToken, { httpOnly: true, secure: false, maxAge: 15 * 60 * 1000 });
    res.json({ message: 'Token successfully rotated/refreshed!' });
  } catch (error) {
    res.status(403).json({ message: 'Invalid or expired refresh token validation state.' });
  }
});

// --- 4. LOGOUT & REVOCATION ENDPOINT ---
router.post('/logout', (req, res) => {
  const refreshToken = req.cookies.refreshToken;
  
  if (refreshToken) {
    revokedRefreshTokens.add(refreshToken); // Revoke the token safely
  }

  // Clear cookie payloads instantly
  res.clearCookie('accessToken');
  res.clearCookie('refreshToken');
  res.json({ message: 'Logged out successfully, local tokens destroyed.' });
});

export default router;