"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function isUnLogged(req, res, next) {
    var _a;
    if ((_a = req.session) === null || _a === void 0 ? void 0 : _a.user) {
        res.status(401).json({ message: 'Unauthorized' });
        return;
    }
    next();
}
exports.default = isUnLogged;
