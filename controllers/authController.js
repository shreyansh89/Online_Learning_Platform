const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// JWT Token Generate
const generateToken = require('../utils/generateToken');

module.exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        const token = generateToken(user._id, user.role);
        res.status(201).json({ token });
    } 
    catch (error) {
        res.status(400).json({ error: 'User registration failed' });
    }
};

module.exports.login = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(400).json({ error: 'Invalid credentials' });
    }
    const token = generateToken(user._id, user.role);
    res.status(200).json({ token });
};