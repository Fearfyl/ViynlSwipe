import axios from 'axios';

export const spotifyGet = async (accessToken, endpoint, params = {}) => {
  const url = `https://api.spotify.com/v1/${endpoint}`;
  return axios.get(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
    params
  });
};

export const spotifyPost = async (accessToken, endpoint, body = {}) => {
  const url = `https://api.spotify.com/v1/${endpoint}`;
  return axios.post(url, body, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
  });
};

export const spotifyPostRaw = async (accessToken, url, body = {}) => {
  return axios.post(url, body, {
    headers: { Authorization: `Bearer ${accessToken}`, 'Content-Type': 'application/json' }
  });
};

