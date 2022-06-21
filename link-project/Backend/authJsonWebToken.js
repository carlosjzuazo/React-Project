const jwt = require('jsonwebtoken');
const { generateError } = require('./helpers');

const authUser = (req, res, next) => {
  try {
    const { authorization } = req.headers;

    if (!authorization) {
      throw generateError('Authorization header missed', 401);
    }

    // Comprobamos que el token sea correcto
    let token;

    try {
      token = jwt.verify(authorization, process.env.REACT_APP_JWT_SECRET);
    } catch {
      throw generateError('Wrong token', 401);
    }

    req.userId = token.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = {
  authUser,
};
