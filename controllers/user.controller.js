/* controllers/user.controller.js ----------------------------------- */
const jwt  = require('jsonwebtoken');
const User = require('../models/user.model');   // <- no “.js” needed in CommonJS

const sign = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '1d' });

/* ───────── handlers ───────── */

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    if (await User.findOne({ email }))
      return res.status(400).json({ msg: 'User exists' });

    const user = await User.create({ username, email, password });
    res.status(201).json({
      token: sign(user._id),
      user: { id: user._id, username, email },
    });
  } catch (err) { next(err); }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password)))
      return res.status(401).json({ msg: 'Invalid credentials' });

    res.json({
      token: sign(user._id),
      user: { id: user._id, username: user.username, email },
    });
  } catch (err) { next(err); }
};

const logout = (_req, res) => res.json({ msg: 'Logged out (client clears token)' });

/* ───────── export ───────── */

module.exports = { register, login, logout };
