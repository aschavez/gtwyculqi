"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TokenSchema = void 0;
const zod_1 = require("zod");
exports.TokenSchema = zod_1.z.object({
    token: zod_1.z.string(),
});
