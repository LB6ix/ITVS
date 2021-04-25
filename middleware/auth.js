const jwt = require('jsonwebtoken');
const config = require('config');

function authUser(req, res, next) {
  const token = req.header('x-auth-token');

  if (!token) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }

  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid for user' });
      } else {
        req.user = decoded.user;
        next();
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }
}

function authAdmin(req, res, next) {
  const token = req.header('x-auth-token');
  if (!token) {
    return res.status(401).json({ msg: 'No token, auth denied' });
  }
  try {
    jwt.verify(token, config.get('jwtSecret'), (error, decoded) => {
      if (error) {
        return res.status(401).json({ msg: 'Token is not valid for admin' });
      } else if (decoded.user.role === 'admin') {
        req.user = decoded.user;
        next();
      } else {
        return res.status(401).json({ errors: [{ msg: 'Neautorizuota' }] });
      }
    });
  } catch (err) {
    console.error('something wrong with auth middleware');
    res.status(500).json({ msg: 'Server Error' });
  }

  //   if (req.user.role === 'admin') {
  //     return next();
  //   }
  //   return res.status(401).send('Unauthorized');
}

module.exports = { authUser, authAdmin };
