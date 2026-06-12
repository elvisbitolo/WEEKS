import { Router } from 'express';
import { getAllStories, createStory, updateStory } from '../controllers/storyController';
import { authenticateToken } from '../middleware/authMiddleware';
import { authorizeStoryAccess } from '../middleware/authorize';

const router = Router();

router.get('/', authenticateToken, getAllStories);
router.post('/', createStory);
router.patch('/:id', authenticateToken, authorizeStoryAccess, updateStory);

export default router;