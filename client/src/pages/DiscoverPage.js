import React, { useState } from 'react';
import { searchSeed, getRecommendations } from '../services/api';
// (Assumes you already have a SwipeDeck from Week 2)
import SwipeDeck from '../components/SwipeDeck';

export default function DiscoverPage() {
  const [query, setQuery] = useState('');
  const [seed, setSeed] = useState({ artistId: '', trackId: '' });
  const [recs, setRecs] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    const res = await searchSeed(query.trim());
    // Pick first artist OR track result as seed for MVP:
    const artist = res.artists?.items?.[0];
    const track = res.tracks?.items?.[0];
    setSeed({ artistId: artist?.id || '', trackId: track?.id || '' });
  };

  const handleFetchRecs = async () => {
    const data = await getRecommendations({
      seedArtistId: seed.artistId || undefined,
      seedTrackId: seed.trackId || undefined,
      limit: 20
    });
    setRecs(data.tracks || []);
  };

  return (
    <div style={{ padding: 24 }}>
      <h2>Discover</h2>
      <form onSubmit={handleSearch} style={{ marginBottom: 12 }}>
        <input
          placeholder="Type an artist or song..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          style={{ padding: 8, width: 300 }}
        />
        <button type="submit" style={{ marginLeft: 8 }}>Find Seed</button>
      </form>

      <div style={{ marginBottom: 12 }}>
        <button onClick={handleFetchRecs} disabled={!seed.artistId && !seed.trackId}>
          Get Recommendations
        </button>
      </div>

      <SwipeDeck items={recs} />
    </div>
  );
}
