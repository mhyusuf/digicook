const router = require('express').Router();
const passport = require('passport');

const { login, logout, currentUser } = require('../controllers/authController');

router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google'), login);
router.get('/logout', logout);
router.get('/current-user', currentUser);

module.exports = router;
