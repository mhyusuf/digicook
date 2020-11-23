import Express from 'express';
const router = Express.Router(); // Accesses Express router
import passport from 'passport';
import authController from '../controllers/authController'; // Import controler functions from authController
const { login, logout, currentUser } = authController;
// Navigate user to Google login form (hosted on Google servers), request profile and email information back
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// After user logs in on form
router.get('/google/callback', // Google sends user back to google/callback (specefied in services/passport.js)
passport.authenticate('google'), // Google returns an access token, profile and refresh token - where we authenticate the user on our backend (specefied in services/passport.js)
login); // Proceeds to login callback (like redirect)

// Executes logout callback on /logout request
router.get('/logout', logout);

// Executes currentUser callback on /current-user request
router.get('/current-user', currentUser);

module.exports = router;
