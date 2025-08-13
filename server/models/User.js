import mongoose from 'mongoose';

const User = mongoose.model('User', UserSchema);
const UserSchema = new mongoose.Schema({
    spotifyId: String,
    displayName: String,
    email: String,
    profileImage: String,
});

export default User;
