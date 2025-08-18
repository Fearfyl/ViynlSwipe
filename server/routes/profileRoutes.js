import express from 'express';
import { requireAuth } from '../middleware/auth.js';
import { getProfile, removeLike } from '../controllers/profileController.js';

const router = express.Router();
router.get('/me', requireAuth, getProfile);
router.delete('/likes/:trackId', requireAuth, removeLike);

export default router;
