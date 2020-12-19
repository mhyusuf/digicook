import { Response, NextFunction } from 'express';
import { RequestWithUserAuth } from '../interfaces/requests';

// If user exists on req objects (user is logged in) - proceed to callback - else, throw error
module.exports = (
  req: RequestWithUserAuth,
  res: Response,
  next: NextFunction,
) => {
  if (!req.user) {
    return res.status(401).send({ error: 'Please log in' });
  }
  next();
};
