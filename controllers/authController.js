// Import necessary modules
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Directly import the User model

// Register user
const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user with the hashed password
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find the user in the database
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Compare the provided password with the hashed password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

module.exports = { register, login };