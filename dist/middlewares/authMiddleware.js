"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.auth = void 0;
const auth = () => (req, resp, next) => {
    const bearerHeader = req.headers['authorization'];
    if (typeof bearerHeader !== 'undefined') {
        const bearerToken = bearerHeader.split(' ')[1];
        if (bearerToken == process.env.PK_TOKEN_DEFAULT) {
            return next();
        }
        return resp.status(401).json();
    }
    return resp.status(401).json();
};
exports.auth = auth;
