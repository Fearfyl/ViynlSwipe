import { spotifyGet, spotifyPost, spotifyPostRaw } from '../utils/spotifyAPI.js';

export const createPlaylistFromLikes = async (req, res) => {
  try {
    const { name = 'JamSwipe Likes', description = 'Songs liked in JamSwipe', isPublic = false } = req.body;
    const user = req.user;
    const accessToken = user.accessToken;

    // 1) Get current Spotify user id
    const me = await spotifyGet(accessToken, 'me');
    const spotifyUserId = me.data.id;

    // 2) Create playlist
    const newPl = await spotifyPost(accessToken, `users/${spotifyUserId}/playlists`, {
      name, description, public: isPublic
    });

    // 3) Collect track URIs from liked songs
    const uris = user.likedSongs.map(s => `spotify:track:${s.trackId}`);
    // Spotify limits to 100 per add; chunk just in case
    const chunks = [];
    for (let i = 0; i < uris.length; i += 100) chunks.push(uris.slice(i, i + 100));

    // 4) Add tracks in chunks
    for (const group of chunks) {
      await spotifyPostRaw(accessToken, `${newPl.data.tracks.href.replace('/tracks', '')}/tracks`, { uris: group });
    }

    return res.json({ ok: true, playlist: newPl.data });
  } catch (e) {
    console.error('createPlaylistFromLikes', e?.response?.data || e.message);
    return res.status(500).json({ error: 'Failed to create playlist' });
  }
};
