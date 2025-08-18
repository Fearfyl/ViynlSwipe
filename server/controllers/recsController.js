import { spotifyGet } from '../utils/spotifyAPI.js';

export const searchSeed = async (req, res) => {
  try {
    const { q, type = 'track,artist', limit = 5 } = req.query;
    if (!q) return res.status(400).json({ error: 'Missing q' });

    const r = await spotifyGet(req.user.accessToken, 'search', { q, type, limit });
    return res.json(r.data);
  } catch (e) {
    console.error('searchSeed', e?.response?.data || e.message);
    return res.status(500).json({ error: 'Seed search failed' });
  }
};

export const getRecommendations = async (req, res) => {
  try {
    const { seedArtistId, seedTrackId, limit = 20 } = req.query;
    const params = { limit };
    if (seedArtistId) params.seed_artists = seedArtistId;
    if (seedTrackId) params.seed_tracks = seedTrackId;

    if (!seedArtistId && !seedTrackId) {
      return res.status(400).json({ error: 'Provide seedArtistId or seedTrackId' });
    }

    const r = await spotifyGet(req.user.accessToken, 'recommendations', params);
    return res.json(r.data);
  } catch (e) {
    console.error('getRecommendations', e?.response?.data || e.message);
    return res.status(500).json({ error: 'Recommendations failed' });
  }
};
