import express from 'express';
import { register, login } from '../../controllers/authController.js';

const router = express.Router();

// Ruta Register
router.post('/register', register);

// Ruta Login
router.post('/login', login);

export default router;