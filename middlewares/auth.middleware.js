const jwt = require('jsonwebtoken');
const User=require('../models/user.model');

export const protect = async (req, res, next) => {
  const hdr = req.headers.authorization || '';
  if (!hdr.startsWith('Bearer ')) return res.status(401).json({ msg: 'No token' });

  try {
    const decoded = jwt.verify(hdr.split(' ')[1], process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch {
    res.status(401).json({ msg: 'Token invalid/expired' });
  }
};
