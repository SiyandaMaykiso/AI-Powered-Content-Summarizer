
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User'); 


const register = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const hashedPassword = await bcrypt.hash(password, 10);

    
    const newUser = await User.create({ username, password: hashedPassword });

    res.status(201).json({ message: 'User registered successfully', user: { id: newUser.id, username: newUser.username } });
  } catch (error) {
    res.status(500).json({ error: 'Registration failed', details: error.message });
  }
};


const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '24h' });

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error: 'Login failed', details: error.message });
  }
};

module.exports = { register, login };