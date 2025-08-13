export const login = (req, res) => {
  const redirect_uri = encodeURIComponent(process.env.REDIRECT_URI);
  res.redirect(`https://accounts.spotify.com/authorize?client_id=${process.env.SPOTIFY_CLIENT_ID}&response_type=code&redirect_uri=${redirect_uri}&scope=user-top-read`);
};

export const callback = (req, res) => {
  // Exchange code for access token (implement later)
  res.send('OAuth callback hit');
};