const { genToken, isValidToken } = require('../services/jwtSerice');

const generateToken = (req, res, next) => {
  try {
    const { user } = req;
    const payload = { email: user.email, password: user.password };
    const token = genToken(payload);
  
    req.token = token;
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

const checkToken = (req, res, next) => {
  try {
    const { authorization } = req.headers;
  
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
  
    const tokenValid = isValidToken(authorization);

    if (!tokenValid) {
      return res.status(401).json({ message: 'Expired or invalid token' });
    }
    
    next();
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({ message: 'Algo deu errado' });
  }
};

module.exports = {
  generateToken,
  checkToken,
};