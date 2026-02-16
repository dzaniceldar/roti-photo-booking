// controllers/authController.js
const User = require('../models/userModel');

const authController = {
  register: (req, res) => {
    const newUser = req.body;
    
    User.register(newUser, (err, createdUser) => {
      if (err) {
        return res.status(500).json({ error: 'Error registering user.' });
      }
      res.status(201).json(createdUser);
    });
  },

  login: (req, res) => {
    const { username, password } = req.body;
    User.login(username, password, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Error logging in.' });
      }
      if (!user) {
        return res.status(401).json({ error: 'Invalid credentials.' });
      }

      // Return a token or other authentication information
      res.json({ user });
    });
  },

  getMe: (req, res) => {
    User.getById(req.user.id, (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Error fetching user.' });
      }
      if (!user) {
        return res.status(404).json({ error: 'User not found.' });
      }
      res.json(user);
    });
  },
};

module.exports = authController;
