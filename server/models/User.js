import mongoose from 'mongoose';

const LikedSongSchema = new mongoose.Schema({
  trackId: { type: String, required: true },    
  title: String,
  artist: String,
  album: String,
  previewUrl: String,
  image: String,
  addedAt: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);
const UserSchema = new mongoose.Schema({
   spotifyId: { type: String, index: true },
  name: String,
  // Store tokens if not added in Week 2:
  accessToken: String,
  refreshToken: String,
  tokenExpiresAt: Date,
  likedSongs: [LikedSongSchema],
  lastSeed: {
    artistId: String,
    trackId: String,
    query: String
  }
}, { timestamps: true });

export default User;
