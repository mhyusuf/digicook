"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose"); // Import mongoose schema class
// Create new user schema
var userSchema = new mongoose_1.Schema({
    googleId: String,
    name: String,
    email: String
});
userSchema.virtual('collections', {
    ref: 'Collection',
    localField: '_id',
    foreignField: '_user'
});
exports.default = mongoose_1.model('User', userSchema); // Export model
