import { Response, NextFunction } from 'express';
import { AuthenticatedRequest } from './authMiddleware';
import pool from '../config/db';
import { query } from '../config/db';

export const authorizeStoryAccess = async (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const userId = req.user?.userId;
  const { id } = req.params;

  try {
    const storyQuery = await pool.query('SELECT author_id FROM stories WHERE id = $1', [id]);
    if (storyQuery.rows.length === 0) return res.status(404).json({ message: 'Story not found' });

    const story = storyQuery.rows[0];
    if (story.author_id === userId) {
      return next(); // Author has master control bypass
    }

    // Secondary Check: Check if user is an approved contributor
    const contributorQuery = await pool.query(
      'SELECT id FROM contributors WHERE story_id = $1 AND user_id = $2',
      [id, userId]
    );

    if (contributorQuery.rows.length > 0 && req.method === 'PATCH') {
      return next(); // Contributors are granted patch permission boundaries
    }

    return res.status(403).json({ message: 'Unauthorized permission boundary breach.' });
  } catch (error) {
    res.status(500).json({ message: 'Authorization error processing validation logs.' });
  }
};