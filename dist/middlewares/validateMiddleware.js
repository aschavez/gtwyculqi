"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validate = void 0;
const validate = (schema) => (req, res, next) => {
    try {
        schema.parse(req.body);
        return next();
    }
    catch (err) {
        return res.status(400).json(err.issues);
    }
};
exports.validate = validate;
