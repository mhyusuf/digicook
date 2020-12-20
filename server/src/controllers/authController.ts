import { Request, Response } from 'express';

const login = (req: Request, res: Response): void => {
  res.redirect('/user');
};

const logout = (req: Request, res: Response): void => {
  req.logout();
  res.redirect('/');
};

const currentUser = (req: Request, res: Response): void => {
  res.send(req.user);
};

export default { login, logout, currentUser };
