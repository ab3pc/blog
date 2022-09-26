import jwt from 'jsonwebtoken';
import { ENV } from '../common/enums/app/app.js';

const checkAuth = (req, res, next) => {
  const token = (req.headers.authorization || '').replace(/Bearer\s?/, '');

  if(token) {
    try {
      const decoded = jwt.verify(token, ENV.JWT.SECRET);
      req.userId = decoded._id;
      next();
    } catch (error) {
      return res.status(403).json({
        message: 'Access denied'
      });
    }
  } else  {
    return res.status(403).json({
      message: 'Access denied'
    });
  }

}

export { checkAuth };