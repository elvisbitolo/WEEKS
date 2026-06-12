import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import storyRoutes from './routes/storyRoutes';
import { authenticateToken } from './middleware/authMiddleware';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS so your frontend at localhost:5173 can talk to your backend safely
app.use(cors({
  origin: 'http://localhost:5173', 
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// Wire up your routes
app.use('/api/auth', authRoutes);
app.use('/api/stories', storyRoutes);

app.listen(PORT, () => {
  console.log(` Server spinning up smoothly on http://localhost:${PORT}`);
});