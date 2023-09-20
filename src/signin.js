const jwt = require('jsonwebtoken');
const User = require('./models/User');

function loginUser(req, res) {
  const { username, password } = req.body;
  const user = { username, role: 'tax-accountant' };
  const token = jwt.sign(user, process.env.JWT_SECRET, { expiresIn: '1h' });

  res.json({ token });
}