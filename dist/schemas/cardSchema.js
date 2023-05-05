"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CardSchema = void 0;
const fast_luhn_1 = __importDefault(require("fast-luhn"));
const zod_1 = require("zod");
const isValidCreditCard = (value) => {
    return (0, fast_luhn_1.default)(value.toString());
};
const isValidYear = (value) => {
    const actualYear = new Date().getFullYear();
    return parseInt(value) <= actualYear + 5;
};
exports.CardSchema = zod_1.z.object({
    card_number: zod_1.z.number().int().refine(isValidCreditCard, "Invalid credit card number"),
    cvv: zod_1.z.number().positive().int().min(100, "CVV lenght min 3 digits").max(9999, "CVV lenght max 4 digits"),
    expiration_month: zod_1.z.string().min(1).max(2).regex(/^(0?[1-9]|1[012])$/, "Value must be a valid month"),
    expiration_year: zod_1.z.string().length(4).regex(/^\d{4}$/, "Value must be a valid year").refine(isValidYear, "Invalid year"),
    email: zod_1.z.string().email().min(5).max(100),
});
