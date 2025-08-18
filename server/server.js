import express from 'dotnev';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.js';
import recsRoutes from './routes/recsRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import playlistRoutes from './routes/playlistRoutes.js';

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoutes);
app.use('/api/recs', recsRoutes);
app.use('/api/profile', profileRoutes);
app.use('/api/playlists', playlistRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});