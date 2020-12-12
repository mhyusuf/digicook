"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// If user exists on req objects (user is logged in) - proceed to callback - else, throw error
module.exports = function (req, res, next) {
    if (!req.user) {
        return res.status(401).send({ error: 'Please log in' });
    }
    next();
};
