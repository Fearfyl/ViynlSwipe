import React, { useEffect, useState } from 'react';
import { getProfile, removeLike, createPlaylistFromLikes } from '../services/api';

export default function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [playlistName, setPlaylistName] = useState('JamSwipe Likes');
  const [desc, setDesc] = useState('Songs liked in JamSwipe');
  const [isPublic, setIsPublic] = useState(false);
  const [busy, setBusy] = useState(false);

  const load = async () => {
    const p = await getProfile();
    setProfile(p);
  };
  useEffect(() => { load(); }, []);

  const handleRemove = async (trackId) => {
    await removeLike(trackId);
    await load();
  };

  const handleCreatePlaylist = async () => {
    setBusy(true);
    try {
      const r = await createPlaylistFromLikes({ name: playlistName, description: desc, isPublic });
      alert(`Playlist created: ${r.playlist?.name || 'Done'}`);
    } catch (e) {
      alert('Failed to create playlist');
    } finally {
      setBusy(false);
    }
  };

  if (!profile) return <div>Loading...</div>;
  return (
    <div style={{ padding: 24 }}>
      <h2>{profile.name || 'Me'}</h2>
      <h3>Liked Songs ({profile.likedSongs?.length || 0})</h3>

      <div style={{ margin: '12px 0' }}>
        <input value={playlistName} onChange={(e)=>setPlaylistName(e.target.value)} placeholder="Playlist name" />
        <input value={desc} onChange={(e)=>setDesc(e.target.value)} placeholder="Description" style={{ marginLeft: 8 }}/>
        <label style={{ marginLeft: 8 }}>
          <input type="checkbox" checked={isPublic} onChange={(e)=>setIsPublic(e.target.checked)} />
          Public
        </label>
        <button onClick={handleCreatePlaylist} disabled={busy || (profile.likedSongs||[]).length === 0} style={{ marginLeft: 8 }}>
          {busy ? 'Creating...' : 'Create Spotify Playlist'}
        </button>
      </div>

      <ul style={{ listStyle: 'none', padding: 0 }}>
        {(profile.likedSongs || []).map(song => (
          <li key={song.trackId} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            {song.image && <img src={song.image} alt="" width={48} height={48} style={{ marginRight: 8, objectFit: 'cover' }} />}
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600 }}>{song.title}</div>
              <div style={{ opacity: 0.8 }}>{song.artist}</div>
            </div>
            <button onClick={() => handleRemove(song.trackId)}>Remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
