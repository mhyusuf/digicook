import Express from 'express';
const router = Express.Router();
import passport from 'passport';
import authController from '../controllers/authController';
const { login, logout, currentUser } = authController;

router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] }),
);
router.get('/google/callback', passport.authenticate('google'), login);
router.get('/logout', logout);
router.get('/current-user', currentUser);

module.exports = router;
