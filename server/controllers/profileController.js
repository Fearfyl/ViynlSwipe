export const getProfile = async (req, res) => {
  const user = req.user;
  // Don’t return tokens
  return res.json({
    id: user._id,
    name: user.name,
    spotifyId: user.spotifyId,
    likedSongs: user.likedSongs
  });
};

export const removeLike = async (req, res) => {
  const { trackId } = req.params;
  const user = req.user;
  user.likedSongs = user.likedSongs.filter(s => s.trackId !== trackId);
  await user.save();
  return res.json({ ok: true, likedSongs: user.likedSongs });
};
