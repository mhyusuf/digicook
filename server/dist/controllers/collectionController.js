"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
;
;
var Collection = require('../models/collection');
var Recipe = require('../models/recipe');
var processImage = require('../services/imageUpload').processImage;
// Sends back collections to client from following parameters on req object:
// q (search query string), user (_user mongo string), pub (Boolean, if public/private)
exports.getCollections = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var match, _a, q, user, pub, collections, e_1;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                match = void 0;
                _a = req.query, q = _a.q, user = _a.user, pub = _a.pub;
                // If a user is logged in, assign it to the match obj
                if (user)
                    match._user = req.query.user;
                if (pub === 'true')
                    match.isPrivate = false;
                // If a query string is provided, filter by passing it as RegEx, case-insensitive
                if (q) {
                    match.name = {
                        $regex: q,
                        $options: 'i'
                    };
                }
                return [4 /*yield*/, Collection.find(match).populate('_user')];
            case 1:
                collections = _b.sent();
                res.send(collections);
                return [3 /*break*/, 3];
            case 2:
                e_1 = _b.sent();
                console.log(e_1);
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Sends back png image to client of type Buffer given an id in the URL
exports.getCollectionImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var collection, e_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, Collection.findById(req.params.id)];
            case 1:
                collection = _a.sent();
                res.set('Content-Type', 'image/png');
                res.send(collection.image);
                return [3 /*break*/, 3];
            case 2:
                e_2 = _a.sent();
                res.sendStatus(404);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Sends back a single collection to client, with recipe objs in place of their _id references
// Accepts a URL param of id, and a query param of q
exports.getCollectionDetails = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var match, q, _id, collection, e_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                match = {};
                q = req.query.q;
                if (q) {
                    match.name = {
                        $regex: q,
                        $options: 'i'
                    };
                }
                _id = req.params.id;
                return [4 /*yield*/, Collection.findById(_id)
                        .populate({
                        path: '_recipes',
                        match: match
                    })
                        .exec()];
            case 1:
                collection = _a.sent();
                res.send(collection);
                return [3 /*break*/, 3];
            case 2:
                e_3 = _a.sent();
                console.log(e_3.message);
                res.sendStatus(404);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Creates and sends back a new collection to client, given a name, description and isPrivate boolean
exports.postCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, name_1, description, isPrivate, collection, e_4;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                _a = req.body, name_1 = _a.name, description = _a.description, isPrivate = _a.isPrivate;
                return [4 /*yield*/, Collection.create({
                        name: name_1,
                        _user: req.user,
                        description: description,
                        isPrivate: isPrivate
                    })];
            case 1:
                collection = _b.sent();
                res.status(201).send(collection);
                return [3 /*break*/, 3];
            case 2:
                e_4 = _b.sent();
                res.sendStatus(500);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Sends back status code to client, given url param id and user object on request object
exports.postCollectionImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, reqUser, _user, collection, buffer, e_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                _id = req.params.id;
                reqUser = req.user;
                _user = reqUser._id;
                return [4 /*yield*/, Collection.findOne({ _id: _id, _user: _user })];
            case 1:
                collection = _a.sent();
                if (!collection)
                    throw new Error();
                return [4 /*yield*/, processImage({
                        buffer: req.file.buffer,
                        width: 360,
                        height: 360
                    })];
            case 2:
                buffer = _a.sent();
                // Save the image buffer to the DB collection object and save
                collection.image = buffer;
                return [4 /*yield*/, collection.save()];
            case 3:
                _a.sent();
                res.send();
                return [3 /*break*/, 5];
            case 4:
                e_5 = _a.sent();
                res.sendStatus(400);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); };
// Sends back updated collection to client, given req.params id and req.body name and description
exports.updateCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, _a, name_2, description, updatedCollection, e_6;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 2, , 3]);
                id = req.params.id;
                _a = req.body, name_2 = _a.name, description = _a.description;
                return [4 /*yield*/, Collection.findByIdAndUpdate(id, {
                        name: name_2,
                        description: description
                    }, { new: true })];
            case 1:
                updatedCollection = _b.sent();
                res.send(updatedCollection);
                return [3 /*break*/, 3];
            case 2:
                e_6 = _b.sent();
                res.sendStatus(404);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
// Sends back status code to client, given req.params id
exports.deleteCollection = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, deletedCollection, e_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                id = req.params.id;
                return [4 /*yield*/, Collection.findByIdAndDelete(id)];
            case 1:
                deletedCollection = _a.sent();
                // Deletes all recipes related to the collection (cascade)
                return [4 /*yield*/, Recipe.deleteMany({ _collection: deletedCollection._id })];
            case 2:
                // Deletes all recipes related to the collection (cascade)
                _a.sent();
                res.sendStatus(204);
                return [3 /*break*/, 4];
            case 3:
                e_7 = _a.sent();
                res.sendStatus(404);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
