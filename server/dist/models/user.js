var _a = require('mongoose'), Schema = _a.Schema, model = _a.model; // Import mongoose schema class
// Create new user schema
var userSchema = new Schema({
    googleId: String,
    name: String,
    email: String
});
userSchema.virtual('collections', {
    ref: 'Collection',
    localField: '_id',
    foreignField: '_user'
});
module.exports = model('User', userSchema); // Export model
