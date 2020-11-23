"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose"); // Import mongoose schema class
var recipeSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    instructions: {
        type: String,
        required: true
    },
    image: {
        type: Buffer // Store buffer stream of bytes
    },
    ingredients: {
        type: [{ name: String, quantity: String }],
        required: true
    },
    _collection: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Collection'
    },
    _user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {
    timestamps: true // Add created at / updated at properties to document
});
exports.default = mongoose_1.model('Recipe', recipeSchema); // Export model
