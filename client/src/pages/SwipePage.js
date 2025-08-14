import React, { useEffect, useState } from 'react';

export default function SwipePage() {
    const [tracks, setTracks] = useState([]);

    useEffect(() => {
    const token = localStorage.getItem('spotify_token');
    if (token) {
      axios.get('http://localhost:5000/spotify/top-tracks', {
        headers: { Authorization: `Bearer ${token}` }
      }).then(res => setTracks(res.data));
    }
  }, []);

  return (
    <div>
        {tracks.map(track => (
            <SwipeCard key={track.id} track={track} />
      ))}
    </div>
  );
}