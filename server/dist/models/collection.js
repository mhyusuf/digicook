"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose"); // Import mongoose schema class
// Create new collection schema
var collectionSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: Buffer
    },
    isPrivate: {
        type: Boolean,
        default: false
    },
    _user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User'
    },
    _recipes: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Recipe'
        }
    ]
});
collectionSchema.index({ name: 'text', description: 'text' });
exports.default = mongoose_1.model('Collection', collectionSchema); // Export model
