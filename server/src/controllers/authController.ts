import { Request, Response } from 'express';

export function login(req: Request, res: Response) {
  res.redirect('/user');
}

export function logout(req: Request, res: Response) {
  req.logout();
  res.redirect('/');
}

export function currentUser(req: Request, res: Response) {
  res.send(req.user);
}

export default { login, logout, currentUser };
