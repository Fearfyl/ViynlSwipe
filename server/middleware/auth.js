import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import axios from 'axios'

export const requireAuth = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Unauthorized' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    res.status(401).json({ message: 'Unauthorized' });
  }
};

export const ensureSpotifyAccessToken = async (req, res, next) => {
    try {
    const user = req.user;
    if (!user.accessToken || !user.tokenExpiresAt) {
      return res.status(401).json({ error: 'Missing Spotify tokens' });
    }
    if (new Date(user.tokenExpiresAt) > new Date()) return next();

    // Refresh token
    const params = new URLSearchParams();
    params.append('grant_type', 'refresh_token');
    params.append('refresh_token', user.refreshToken);
    const basic = Buffer.from(`${process.env.SPOTIFY_CLIENT_ID}:${process.env.SPOTIFY_CLIENT_SECRET}`).toString('base64');

    const resp = await axios.post('https://accounts.spotify.com/api/token', params, {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', Authorization: `Basic ${basic}` }
    });

    user.accessToken = resp.data.access_token;
    if (resp.data.expires_in) {
      user.tokenExpiresAt = new Date(Date.now() + (resp.data.expires_in * 1000) - 60000); // minus 1 min
    }
    await user.save();
    next();
  } catch (e) {
    console.error('Token refresh error', e?.response?.data || e.message);
    return res.status(401).json({ error: 'Spotify token refresh failed' });
  }
};