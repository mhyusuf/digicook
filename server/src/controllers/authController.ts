import { Request, Response } from 'express';

// Redirects to user page - only called if authentication is successful
const login = (req: Request, res: Response): void => {
  res.redirect('/user');
};

// Destroys browser cookie and ends session, native to passport
const logout = (req: Request, res: Response): void => {
  req.logout();
  res.redirect('/');
};

// Returns current user object
const currentUser = (req: Request, res: Response): void => {
  res.send(req.user);
};

export default { login, logout, currentUser };
