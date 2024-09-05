import express from 'express';
import jwt from 'jsonwebtoken';
import { logout } from '../../controllers/authController.js';

const router = express.Router();

// Middleware verify is autenticated
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

// Middleware verify not autenticated
const isNotAuthenticated = (req, res, next) => {
    const token = req.signedCookies.currentUser;
    if (token) return res.redirect('/users/current');
    next();
};

// Ruta Login
router.get('/login', isNotAuthenticated, (req, res) => {
    res.render('login');
});

// Ruta Register
router.get('/register', isNotAuthenticated, (req, res) => {
    res.render('register');
});

// Ruta Logout
router.get('/logout', isAuthenticated, logout);

// Ruta Current
router.get('/current', isAuthenticated, (req, res) => {
    const { first_name, last_name, email, role } = req.user;
    res.render('current', { first_name, last_name, email, role });
});

export default router;