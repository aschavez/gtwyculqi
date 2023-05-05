"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = require("../middlewares/authMiddleware");
const validateMiddleware_1 = require("../middlewares/validateMiddleware");
const cardSchema_1 = require("../schemas/cardSchema");
const tokenSchema_1 = require("../schemas/tokenSchema");
const tokenService_1 = require("../services/tokenService");
const router = express_1.default.Router();
router.post('/', [(0, authMiddleware_1.auth)(), (0, validateMiddleware_1.validate)(cardSchema_1.CardSchema)], (req, res) => {
    const cardData = req.body;
    (0, tokenService_1.signInToken)(cardData, res);
});
router.post('/validate', [(0, authMiddleware_1.auth)(), (0, validateMiddleware_1.validate)(tokenSchema_1.TokenSchema)], (req, res) => {
    const tokenData = req.body;
    (0, tokenService_1.validateToken)(tokenData, res);
});
exports.default = router;
