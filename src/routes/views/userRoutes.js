import express from 'express';
import jwt from 'jsonwebtoken';
import { logout } from '../../controllers/authController.js';

const router = express.Router();

// Middleware para verificar si el usuario está autenticado
const isAuthenticated = (req, res, next) => {
    const token = req.signedCookies.currentUser;
    if (!token) {
        return res.redirect('/users/login');
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        return res.redirect('/users/login');
    }
};

// Middleware para verificar si el usuario NO está autenticado
const isNotAuthenticated = (req, res, next) => {
    const token = req.signedCookies.currentUser;
    if (token) return res.redirect('/users/current');
    next();
};

// Ruta para servir el formulario de login (GET)
router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

// Ruta para servir el formulario de registro (GET)
router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');  // Renderiza la vista de registro
});

// Ruta para logout (GET)
router.get('/logout', isAuthenticated, logout);

// Ruta para mostrar la página actual del usuario (GET /users/current)
router.get('/current', isAuthenticated, (req, res) => {
    const { first_name, last_name, email, role } = req.user;
    res.render('current', { first_name, last_name, email, role });
});

export default router;