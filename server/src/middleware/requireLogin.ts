import { Response, NextFunction } from 'express';
import { RequestWithUserAuth } from '../interfaces/requests';

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
