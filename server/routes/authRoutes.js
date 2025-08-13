import express from 'express';
import { login, callback} from '../controllers/authController.js';

const router = express.Router();

router.post('/login', login);
router.get('/callback', callback);

export default router;
