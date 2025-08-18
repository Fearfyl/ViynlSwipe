import express from 'express';
import { requireAuth, ensureSpotifyAccessToken } from '../middleware/auth.js';
import { getRecommendations, searchSeed } from '../controllers/recsController.js';

const router = express.Router();
router.get('/recommendations', requireAuth, ensureSpotifyAccessToken, getRecommendations);
router.get('/search-seed', requireAuth, ensureSpotifyAccessToken, searchSeed);

export default router;
