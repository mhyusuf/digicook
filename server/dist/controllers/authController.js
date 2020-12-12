"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Redirects to user page - only called if authentication is successful
exports.login = function (req, res) {
    res.redirect('/user');
};
// Destroys browser cookie and ends session, native to passport
exports.logout = function (req, res) {
    req.logout();
    res.redirect('/');
};
// Returns current user object
exports.currentUser = function (req, res) {
    res.send(req.user);
};
