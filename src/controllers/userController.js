import User from '../models/User.js';

// Get all
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: 'Error getting users' });
    }
};

// Update by ID
export const updateUser = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;

    try {
        const updatedUser = await User.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Update error' });
    }
};

// Delete by ID
export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        await User.findByIdAndDelete(id);
        res.status(200).json({ message: 'User deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};