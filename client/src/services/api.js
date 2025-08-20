const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

const authHeader = () => {
  const jwt = localStorage.getItem('jwt'); // set this in your login flow
  return jwt ? { Authorization: `Bearer ${jwt}` } : {};
};

export const searchSeed = async (q) => {
  const res = await fetch(`${API_BASE}/api/recs/search-seed?q=${encodeURIComponent(q)}`, {
    headers: authHeader()
  });
  if (!res.ok) throw new Error('Seed search failed');
  return res.json();
};

export const getRecommendations = async ({ seedArtistId, seedTrackId, limit = 20 }) => {
  const qs = new URLSearchParams({ limit, ...(seedArtistId ? { seedArtistId } : {}), ...(seedTrackId ? { seedTrackId } : {}) });
  const res = await fetch(`${API_BASE}/api/recs/recommendations?${qs.toString()}`, {
    headers: authHeader()
  });
  if (!res.ok) throw new Error('Recommendations failed');
  return res.json();
};

export const getProfile = async () => {
  const res = await fetch(`${API_BASE}/api/profile/me`, { headers: authHeader() });
  if (!res.ok) throw new Error('Profile failed');
  return res.json();
};

export const removeLike = async (trackId) => {
  const res = await fetch(`${API_BASE}/api/profile/likes/${trackId}`, {
    method: 'DELETE',
    headers: authHeader()
  });
  if (!res.ok) throw new Error('Remove like failed');
  return res.json();
};

export const createPlaylistFromLikes = async ({ name, description, isPublic }) => {
  const res = await fetch(`${API_BASE}/api/playlist/create-from-likes`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader() },
    body: JSON.stringify({ name, description, isPublic })
  });
  if (!res.ok) throw new Error('Playlist creation failed');
  return res.json();
};
