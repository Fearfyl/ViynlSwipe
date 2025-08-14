import {getSpotifyData } from 'utils/spotify.js'

export const getTopTracks = async (req, res) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const data = await getSpotifyData(token, 'me/top/tracks?limit=10');
        res.json(data);
    } catch (error) {
        console.error('Error fetching top tracks:', error);
        res.status(500).json({ error: 'Failed to fetch top tracks' });
    }
};
