import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Register
export const register = async (req, res) => {
    const { first_name, last_name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send('The provided email already exists');
        }

        const newUser = new User({ first_name, last_name, email, password });
        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email, role: newUser.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('currentUser', token, { httpOnly: true, signed: true });
        return res.redirect('/users/current');
    } catch (error) {
        console.error('Registry error:', error);
        return res.status(500).send('Registry error');
    }
};

// Login
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).send('Login failed: Wrong information');
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).send('Login failed: Wrong information');
        }

        const token = jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.cookie('currentUser', token, { httpOnly: true, signed: true });
        return res.redirect('/users/current');
    } catch (error) {
        console.error('Login error:', error);
        return res.status(500).send('Login error');
    }
};

// Logout
export const logout = (req, res) => {
    res.clearCookie('currentUser');
    res.redirect('/users/login');
};