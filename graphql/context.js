const jwt = require('jsonwebtoken');
require('dotenv').config();

const secret = process.env.JWT_SECRET;

const context = ({ req }) => {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return {};
  }

  try {
    const decoded = jwt.verify(token, secret);
    return { user: { email: decoded.email } };
  } catch (err) {
    throw new Error('Token inválido');
  }
};

module.exports = context;