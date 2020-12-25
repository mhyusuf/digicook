import { Router } from 'express';
import passport from 'passport';
import { login, logout, currentUser } from '../controllers/authController';

const router = Router();
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get('/google/callback', passport.authenticate('google'), login);
router.get('/logout', logout);
router.get('/current-user', currentUser);

export default router;
