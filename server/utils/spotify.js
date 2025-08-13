import axios from 'axios';

export const getSpotifyData = async (token, endpoint) => {
  try {
    const response = await axios.get(`https://api.spotify.com/v1/${endpoint}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching Spotify data:', error);
    throw error;
  }
};
