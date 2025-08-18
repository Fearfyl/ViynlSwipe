import express from 'express';
import { requireAuth, ensureSpotifyAccessToken } from '../middleware/auth.js';
import { createPlaylistFromLikes } from '../controllers/playlistController.js';

const router = express.Router();
router.post('/create-from-likes', requireAuth, ensureSpotifyAccessToken, createPlaylistFromLikes);

export default router;
