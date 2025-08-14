import React from 'react';

export default function SwiperCard({track}) {
    return (
        <div className="swipe-card">
            <img src={track.album.images[0].url} alt={track.name} />
            <h3>{track.name}</h3>
            <p>{track.artists.map(artist => artist.name).join(', ')}</p>
        </div>
    );
}