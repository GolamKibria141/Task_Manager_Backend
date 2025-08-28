module.exports = function (err, _req, res, _next) {
  const status = err.status || 500;
  res.status(status).json({ msg: err.message || 'Server error' });
};