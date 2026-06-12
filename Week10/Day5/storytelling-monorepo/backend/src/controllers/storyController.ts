import { Response } from 'express';
import { AuthenticatedRequest } from '../middleware/authMiddleware';
import { db } from '../config/db';

export const getAllStories = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const result = await db.query(
      `SELECT s.*, u.username as author_name FROM stories s 
       JOIN users u ON s.author_id = u.id ORDER BY s.updated_at DESC`
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ message: 'Error pulling storage indices.' });
  }
};

export const createStory = async (req: AuthenticatedRequest, res: Response) => {
  const { title, content } = req.body;
  const authorId = req.user?.userId;

  try {
    const result = await db.query(
      'INSERT INTO stories (title, content, author_id) VALUES ($1, $2, $3) RETURNING *',
      [title, content, authorId]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed to write story data asset.' });
  }
};

export const updateStory = async (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const result = await db.query(
      'UPDATE stories SET title = $1, content = $2, updated_at = CURRENT_TIMESTAMP WHERE id = $3 RETURNING *',
      [title, content, id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ message: 'Failed processing story mutations.' });
  }
};