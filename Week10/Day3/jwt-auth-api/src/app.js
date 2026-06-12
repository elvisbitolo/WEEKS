import express from 'express';
import cookieParser from 'cookie-parser';
import { config } from './config/env.js';
import authRoutes from './routes/authRoutes.js';
import { verifyToken } from './middleware/authMiddleware.js';

const app = express();

// Apply Global Middleware Pipelines
app.use(express.json());
app.use(cookieParser());

// Mount authentication controller route engines
app.use('/api/auth', authRoutes);

// --- 6. SECURED HIGH CONFIDENTIALITY PRIVATE ROUTE ---
app.get('/api/dashboard', verifyToken, (req, res) => {
  // If the flow makes it here, verifyToken successfully appended req.user
  res.json({
    message: `Welcome to the secure dashboard, ${req.user.username}!`,
    secretCorporateData: "The corporate database password is 'pizza123'. Keep it safe!"
  });
});

// Run server execution instance
app.listen(config.port, () => {
  console.log(` Server listening dynamically on port: http://localhost:${config.port}`);
});