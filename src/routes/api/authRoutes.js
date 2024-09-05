import express from 'express';
import { register, login } from '../../controllers/authController.js';

const router = express.Router();

// Ruta de registro (POST)
router.post('/register', register);

// Ruta de login (POST)
router.post('/login', login);

export default router;